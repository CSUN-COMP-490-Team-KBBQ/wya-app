import React from 'react';
import './CalendarPage.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Calendar from 'react-calendar';
import EventList from '../../components/EventList/EventList';
import UserData from '../../interfaces/User';
import { useUserContext } from '../../contexts/UserContext';
import { getDocSnapshot$ } from '../../lib/firestore';

function UpdateAvailabilityModal({
    editScheduleForm,
    show,
    onHide,
}: any): JSX.Element {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>Enter Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>editScheduleForm={editScheduleForm}</Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cancel</Button>
                <Button onClick={onHide}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function CalendarPage(): JSX.Element {
    const user = useUserContext();
    const [userData, setUserData] = React.useState<UserData>();
    const [value, onChange] = React.useState(new Date());
    const [modalShow, setModalShow] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user) {
            return getDocSnapshot$(`/users/${user.uid}`, {
                next: (snapshot) => {
                    setUserData(snapshot.data() as UserData);
                },
            });
        }

        return undefined;
    }, [user]);

    return userData !== undefined ? (
        <div>
            <h1>CalendarPage</h1>

            <div className="calendar-display">
                <h1>Calendar</h1>
                <Calendar
                    onChange={onChange}
                    value={value}
                    calendarType="US"
                    // showDoubleView
                />
                <Button type="button" onClick={() => setModalShow(true)}>
                    Edit Availability
                </Button>
                <UpdateAvailabilityModal
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
            <h1>CalendarPage</h1>
            <div>Please log in to get started</div>
        </div>
    );
}
