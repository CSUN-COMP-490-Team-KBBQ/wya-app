import React from 'react';
import './CalendarPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Calendar from 'react-calendar';
import EventList from '../../components/EventList/EventList';
import UserData from '../../interfaces/User';
import HeatMapData from '../../interfaces/HeatMapData';
import AvailabilityHeatMap from '../../components/AvailabilityHeatMap/AvailabilityHeatMap';
import {
    LABELS,
    createZeroStateArray,
    createCalendarAvailabilityDataArray,
} from '../../lib/AvailabilityHeatMap';
import { useUserContext } from '../../contexts/UserContext';
import {
    getDocSnapshot$,
    updateCalendarAvailability,
} from '../../lib/firestore';

type UpdateAvailabilityModalProps = {
    uid: string;
    show: boolean;
    heatMapData: HeatMapData;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function UpdateAvailabilityModal({
    uid,
    heatMapData,
    show,
    onHide,
}: UpdateAvailabilityModalProps): JSX.Element {
    const { yData, xData, mapData } = heatMapData;

    const [userAvailabilityData, setUserAvailabilityData] =
        React.useState<number[][]>(mapData);

    const onClickHeatMapHandle = (x: number, y: number) => {
        const newUserAvailabilityData = JSON.parse(
            JSON.stringify(userAvailabilityData)
        );
        if (newUserAvailabilityData[y][x] === 0)
            newUserAvailabilityData[y][x] = 1;
        else newUserAvailabilityData[y][x] = 0;

        setUserAvailabilityData(newUserAvailabilityData);
    };

    const onClickClearHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(
            createZeroStateArray(LABELS.yLabels.length, LABELS.xLabels.length)
        );
    };

    const onClickResetHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(mapData);
    };

    const onClickCancelHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(mapData);
        return onHide ? onHide(e) : undefined;
    };

    const onClickUpdateHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        updateCalendarAvailability(userAvailabilityData, uid)
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
                <Modal.Title>Enter Your Availability</Modal.Title>
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
                <Button onClick={(e) => onClickResetHandle(e)}>Reset</Button>
                <Button onClick={(e) => onClickClearHandle(e)}>Clear</Button>
                <Button
                    variant="secondary"
                    onClick={(e) => onClickCancelHandle(e)}
                >
                    Cancel
                </Button>
                <Button onClick={(e) => onClickUpdateHandle(e)}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function CalendarPage(): JSX.Element {
    const user = useUserContext();
    const [userData, setUserData] = React.useState<UserData>();
    const [value, onChange] = React.useState(new Date());
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [heatMapData, setHeatMapData] = React.useState<HeatMapData>();

    React.useEffect(() => {
        if (user) {
            return getDocSnapshot$(`/users/${user.uid}`, {
                next: (snapshot) => {
                    const newUserData = snapshot.data() as UserData;
                    setUserData(newUserData);
                    setHeatMapData({
                        yData: LABELS.yLabels,
                        xData: LABELS.xLabels,
                        mapData:
                            Object.values(newUserData.availability).length === 0
                                ? createZeroStateArray(
                                      LABELS.yLabels.length,
                                      LABELS.xLabels.length
                                  )
                                : createCalendarAvailabilityDataArray(
                                      LABELS.yLabels,
                                      LABELS.xLabels,
                                      newUserData.availability
                                  ),
                        zeroState: [[]],
                    });
                },
            });
        }

        return undefined;
    }, [user]);

    return userData !== undefined && heatMapData !== undefined ? (
        <div>
            <h1>CalendarPage</h1>

            <div className="calendar-display">
                <h1>Calendar</h1>
                <Calendar
                    onChange={onChange}
                    value={value}
                    calendarType="US"
                    // onDayClick
                    // showDoubleView
                />
                <Button type="button" onClick={() => setModalShow(true)}>
                    Edit Availability
                </Button>
                <UpdateAvailabilityModal
                    uid={userData.uid}
                    heatMapData={heatMapData}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </div>
            <EventList
                elementId="calendar-event-list"
                events={userData.events}
            />
        </div>
    ) : (
        <div>
            {/* TODO: Add loading page */}
            <h1>CalendarPage</h1>
        </div>
    );
}
