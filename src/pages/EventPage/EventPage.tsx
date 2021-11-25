import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AvailabilityHeatMap from '../../components/AvailabilityHeatMap/AvailabilityHeatMap';
import EventData, { EventDataAvailability } from '../../interfaces/EventData';
import { getDocSnapshot$, updateEventAvailability } from '../../lib/firestore';
import HeatMapData from '../../interfaces/HeatMapData';
import {
    getYTimesSorted,
    getXDaysSorted,
    formatXDays,
    createAvailabilityDataArray,
    createPreloadArray,
    cleanUpUserAvailability,
} from '../../lib/availability';
import { useUserRecordContext } from '../../contexts/UserRecordContext';
import AvailabilityScheduleSelector from '../../components/AvailabilityScheduleSelector/AvailabilityScheduleSelector';
import ScheduleSelectorData from '../../interfaces/ScheduleSelectorData';

type AddAvailabilityModalProps = {
    heatMapData: HeatMapData;
    scheduleSelectorData: ScheduleSelectorData;
    show: boolean;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
    eventAvailability: EventDataAvailability;
    eventId: string;
    uid: string;
};

function appendUserAvailabilityToGroup(
    xDays: string[],
    yTimes: string[],
    eventAvailability: EventDataAvailability,
    userAvailability: Array<Date>,
    uid: string
): EventDataAvailability {
    cleanUpUserAvailability(userAvailability);

    // removes uid from each cell to start from scratch
    for (let i = 0; i < yTimes.length; i += 1) {
        for (let j = 0; j < xDays.length; j += 1) {
            if (eventAvailability[yTimes[i]][xDays[j]].includes(uid)) {
                const removeIndex = eventAvailability[yTimes[i]][
                    xDays[j]
                ].findIndex((item) => {
                    return item === uid;
                });
                eventAvailability[yTimes[i]][xDays[j]].splice(removeIndex, 1);
            }
        }
    }

    // add uid to each appropriate cell
    for (let i = 0; i < userAvailability.length; i += 1) {
        const time = userAvailability[i].toTimeString().slice(0, 5);
        const temp = new Date(userAvailability[i].toDateString().slice(0, 15));
        const day = temp.getTime().toString();
        if (eventAvailability[time][day].includes(uid)) {
            // eslint-disable-next-line
            console.log('User already HERE');
        } else {
            eventAvailability[time][day].push(uid);
        }
    }

    return eventAvailability;
}

function AddAvailabilityModal({
    heatMapData,
    scheduleSelectorData,
    show,
    onHide,
    eventAvailability,
    eventId,
    uid,
}: AddAvailabilityModalProps): JSX.Element {
    const { yData, xData, xDataFormatted } = heatMapData;
    const { scheduleData } = scheduleSelectorData;

    const [userAvailabilityData, setUserAvailabilityData] =
        React.useState<Array<Date>>(scheduleData);

    const onClickScheduleSelectorHandle = (newSchedule: Array<Date>) => {
        setUserAvailabilityData(newSchedule);
    };

    const onClickCancelHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(scheduleData);
        return onHide ? onHide(e) : undefined;
    };

    const onSubmitHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const newEventAvailability = appendUserAvailabilityToGroup(
            xData,
            yData,
            eventAvailability,
            userAvailabilityData,
            uid
        );
        updateEventAvailability(newEventAvailability, eventId)
            .then(() => {
                return onHide ? onHide(e) : undefined;
            })
            // eslint-disable-next-line
            .catch(console.error);
    };

    // add appropriate 15 minute increment to startTime
    const startTimeFormatted = (timeString: string): number => {
        const minutesString = timeString.slice(3, 5);
        const hoursNum = Number(timeString.slice(0, 2));

        if (minutesString === '15') {
            return hoursNum + 0.25;
        }
        if (minutesString === '30') {
            return hoursNum + 0.5;
        }
        if (minutesString === '45') {
            return hoursNum + 0.75;
        }

        return hoursNum;
    };

    // adds appropriate 15 minutes increment since endTime is rounded down
    const endTimeFormatted = (timeString: string): number => {
        const minutesString = timeString.slice(3, 5);
        const hoursNum = Number(timeString.slice(0, 2));

        if (minutesString === '15') {
            return hoursNum + 0.5;
        }
        if (minutesString === '30') {
            return hoursNum + 0.75;
        }
        if (minutesString === '45') {
            return hoursNum + 1.0;
        }

        return hoursNum + 0.25;
    };

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>Select Availability</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AvailabilityScheduleSelector
                    startTime={startTimeFormatted(yData[0])}
                    endTime={endTimeFormatted(yData[yData.length - 1])}
                    scheduleData={userAvailabilityData}
                    dateFormat="ddd MMM DD YYYY"
                    days={xDataFormatted.length}
                    startDate={new Date(xDataFormatted[0])}
                    handleChange={onClickScheduleSelectorHandle}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={(e) => onClickCancelHandle(e)}
                >
                    Cancel
                </Button>
                <Button onClick={onSubmitHandler}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function EventPage({
    match,
}: {
    match: {
        params: {
            id: string;
        };
    };
}): JSX.Element {
    const { userRecord } = useUserRecordContext();
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [heatMapData, setHeatMapData] = React.useState<HeatMapData>();
    const eventAvailability = React.useRef<EventDataAvailability>();
    const [scheduleSelectorData, setScheduleSelectorData] =
        React.useState<ScheduleSelectorData>();
    const isUserAHost = (): boolean => {
        if (!userRecord) return false;

        return userRecord.events.some(
            (e) => e.eventId === match.params.id && e.role === 'HOST'
        );
    };

    React.useEffect(() => {
        if (userRecord) {
            getDocSnapshot$(`/events/${match.params.id}`, {
                next: (eventSnapshot) => {
                    const event = eventSnapshot.data() as EventData;
                    eventAvailability.current = event.availability;
                    const tempYTimes = getYTimesSorted(event.availability);
                    const tempXDays = getXDaysSorted(
                        tempYTimes,
                        event.availability
                    );
                    const formatedTempXDays = formatXDays(tempXDays);

                    setHeatMapData({
                        yData: tempYTimes,
                        xData: tempXDays,
                        xDataFormatted: formatedTempXDays,
                        mapData: createAvailabilityDataArray(
                            tempYTimes,
                            tempXDays,
                            event.availability
                        ),
                    });

                    setScheduleSelectorData({
                        scheduleData: createPreloadArray(
                            tempYTimes,
                            formatedTempXDays,
                            userRecord.availability
                        ),
                    });
                },
            });
        }
    }, [userRecord]);

    return heatMapData &&
        eventAvailability.current &&
        userRecord &&
        scheduleSelectorData !== undefined ? (
        <div>
            <h1>EventPage</h1>
            <h2>Group Availabilities</h2>
            <AvailabilityHeatMap
                yLabels={heatMapData.yData}
                xLabels={heatMapData.xDataFormatted}
                data={heatMapData.mapData}
                onClick={() => undefined}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            {isUserAHost() && <Button>Finalize Event</Button>}

            <AddAvailabilityModal
                heatMapData={heatMapData}
                scheduleSelectorData={scheduleSelectorData}
                show={modalShow}
                onHide={() => setModalShow(false)}
                eventAvailability={eventAvailability.current}
                eventId={match.params.id}
                uid={userRecord.uid}
            />
        </div>
    ) : (
        <div>
            <h1>EventPage</h1>
        </div>
    );
}
