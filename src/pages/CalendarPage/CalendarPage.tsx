import React from 'react';
import './CalendarPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Calendar from 'react-calendar';
import EventList from '../../components/EventList/EventList';
import Page from '../../components/Page/Page';
import AvailabilityScheduleSelector from '../../components/AvailabilityScheduleSelector/AvailabilityScheduleSelector';
import { useUserRecordContext } from '../../contexts/UserRecordContext';
import { updateCalendarAvailability } from '../../lib/firestore';
import ScheduleSelectorData from '../../interfaces/ScheduleSelectorData';
import { createCalendarAvailabilityDataArray } from '../../lib/availability';

type UpdateAvailabilityModalProps = {
    uid: string;
    show: boolean;
    scheduleSelectorData: ScheduleSelectorData;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function UpdateAvailabilityModal({
    uid,
    scheduleSelectorData,
    show,
    onHide,
}: UpdateAvailabilityModalProps): JSX.Element {
    const { scheduleData, is24Hour } = scheduleSelectorData;

    const [userAvailabilityData, setUserAvailabilityData] =
        React.useState<Array<Date>>(scheduleData);

    const onClickScheduleSelectorHandle = (newSchedule: Array<Date>) => {
        setUserAvailabilityData(newSchedule);
    };

    const onClickClearHandle = () => {
        setUserAvailabilityData([]);
    };

    const onClickResetHandle = () => {
        setUserAvailabilityData(scheduleData);
    };

    const onClickCancelHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(scheduleData);
        return onHide ? onHide(e) : undefined;
    };

    const onClickUpdateHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        // converting to array number for firestore upload
        const convertedUserAvailabilityData = userAvailabilityData.map(
            (value) => value.getTime()
        );
        updateCalendarAvailability(convertedUserAvailabilityData, uid)
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
                <AvailabilityScheduleSelector
                    startTime={0}
                    endTime={24}
                    scheduleData={userAvailabilityData}
                    dateFormat="dddd"
                    days={7}
                    startDate={new Date('January 04, 1970')}
                    handleChange={onClickScheduleSelectorHandle}
                    is24Hour={is24Hour}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClickResetHandle} variant="outline-info">
                    Reset
                </Button>
                <Button onClick={onClickClearHandle} variant="outline-primary">
                    Clear
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={onClickCancelHandle}
                >
                    Cancel
                </Button>
                <Button onClick={onClickUpdateHandle} variant="outline-success">
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function CalendarPage(): JSX.Element {
    const { userRecord } = useUserRecordContext();

    const [value, onChange] = React.useState(new Date());
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [scheduleSelectorData, setScheduleSelectorData] =
        React.useState<ScheduleSelectorData>();

    React.useEffect(() => {
        if (userRecord) {
            setScheduleSelectorData({
                scheduleData: createCalendarAvailabilityDataArray(
                    userRecord.availability
                ),
                sortedXData: [],
                formattedXData: [],
                sortedYData: [],
                formattedYData: [],
                is24Hour: userRecord.timeFormat24Hr,
            });
        }
    }, [userRecord]);

    return (
        <Page>
            {userRecord && scheduleSelectorData !== undefined ? (
                <Container fluid id="calendarContainer">
                    <Row>
                        <Col sm={6} id="calendarCol">
                            <div className="calendar-display">
                                <h1>Calendar</h1>
                                <Calendar
                                    onChange={onChange}
                                    value={value}
                                    calendarType="US"
                                    // onDayClick
                                    // showDoubleView
                                />
                                <Button
                                    type="button"
                                    onClick={() => setModalShow(true)}
                                    className="calendarAddAvailabilityButton"
                                >
                                    Edit Availability
                                </Button>
                                <UpdateAvailabilityModal
                                    uid={userRecord.uid}
                                    scheduleSelectorData={scheduleSelectorData}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </Col>
                        <Col sm={6} id="eventListCol">
                            <EventList
                                elementId="calendar-event-list"
                                events={userRecord.events}
                            />
                        </Col>
                    </Row>
                </Container>
            ) : (
                <></>
            )}
        </Page>
    );
}
