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
    createZeroStateArray,
    createPreloadArray,
} from '../../lib/AvailabilityHeatMap';
import { useUserRecordContext } from '../../contexts/UserRecordContext';

type AddAvailabilityModalProps = {
    heatMapData: HeatMapData;
    show: boolean;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
    eventAvailability: EventDataAvailability;
    eventId: string;
    uid: string;
};

function appendUserAvailabilityToGroup(
    eventAvailability: EventDataAvailability,
    userAvailability: number[][],
    uid: string
): EventDataAvailability {
    // combine data (time and day) in useravailability find same spot in EventDataAvailability and append user or email?
    // want name of people who attend
    // whoever is there, add to yourself
    // ask ivan or jan if using userid or user email (in this function) need to identify
    // useUserRecordContext (???) ask where to place
    // userAvailability[i]

    // const startTimeIndex = LABELS.yLabels.findIndex((item) => {
    //     return item === Object.keys(eventAvailability)[0];
    // });

    const yTimes = Object.keys(eventAvailability).sort();
    const xDays = Object.keys(
        eventAvailability[Object.keys(eventAvailability)[0]]
    ).sort();

    // const startDayIndex = LABELS.xLabels.findIndex((item) => {
    //     return item.slice(0, 3) === Object.keys(eventAvailability)[0]
    // });

    for (let i = 0; i < userAvailability.length; i += 1) {
        for (let j = 0; j < userAvailability[0].length; j += 1) {
            if (userAvailability[i][j] === 1) {
                if (eventAvailability[yTimes[i]][xDays[j]].includes(uid)) {
                    // eslint-disable-next-line
                    console.log('User already HERE');
                } else {
                    eventAvailability[yTimes[i]][xDays[j]].push(uid);
                }
            } else if (eventAvailability[yTimes[i]][xDays[j]].includes(uid)) {
                const removeIndex = eventAvailability[yTimes[i]][
                    xDays[j]
                ].findIndex((item) => {
                    return item === uid;
                });
                eventAvailability[yTimes[i]][xDays[j]].splice(removeIndex, 1);
            } else {
                // eslint-disable-next-line
                console.log('User is already NOT HERE');
            }
        }
    }

    return eventAvailability;
}

function AddAvailabilityModal({
    heatMapData,
    show,
    onHide,
    eventAvailability,
    eventId,
    uid,
}: AddAvailabilityModalProps): JSX.Element {
    const { yData, xData, preloadData } = heatMapData;

    const [userAvailabilityData, setUserAvailabilityData] =
        React.useState<number[][]>(preloadData);

    const onClickHeatMapHandle = (x: number, y: number) => {
        const newUserAvailabilityData = JSON.parse(
            JSON.stringify(userAvailabilityData)
        );
        if (newUserAvailabilityData[y][x] === 0)
            newUserAvailabilityData[y][x] = 1;
        else newUserAvailabilityData[y][x] = 0;

        setUserAvailabilityData(newUserAvailabilityData);
    };

    const onClickCancelHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(preloadData);
        return onHide ? onHide(e) : undefined;
    };

    const onSubmitHandler = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const newEventAvailability = appendUserAvailabilityToGroup(
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
                <AvailabilityHeatMap
                    yLabels={yData}
                    xLabels={xData}
                    data={userAvailabilityData}
                    onClick={onClickHeatMapHandle}
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
    const userRecord = useUserRecordContext();
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [heatMapData, setHeatMapData] = React.useState<HeatMapData>();
    const eventAvailability = React.useRef<EventDataAvailability>();

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
                    const zeroState = createZeroStateArray(
                        tempYTimes.length,
                        tempXDays.length
                    );

                    setHeatMapData({
                        yData: tempYTimes,
                        xData: formatedTempXDays,
                        mapData: createAvailabilityDataArray(
                            tempYTimes,
                            tempXDays,
                            event.availability
                        ),
                        preloadData:
                            Object.values(userRecord.availability).length === 0
                                ? zeroState
                                : createPreloadArray(
                                      tempYTimes,
                                      formatedTempXDays,
                                      userRecord.availability
                                  ),
                        zeroState,
                    });
                },
            });
        }
    }, [userRecord]);

    return heatMapData && eventAvailability.current && userRecord ? (
        <div>
            <h1>EventPage</h1>
            <h2>Group Availabilities</h2>
            <AvailabilityHeatMap
                yLabels={heatMapData.yData}
                xLabels={heatMapData.xData}
                data={heatMapData.mapData}
                onClick={() => undefined}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabilityModal
                // userAvail={heatMapData.preloadData}
                heatMapData={heatMapData}
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
