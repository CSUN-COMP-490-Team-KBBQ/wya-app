import React from 'react';
import './CalendarPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Calendar from 'react-calendar';
import EventList from '../../components/EventList/EventList';
import UserData, { UserDataAvailability } from '../../interfaces/User';
import AvailabilityMap from '../../components/AvailabilityMap/AvailabilityMap';
import { useUserContext } from '../../contexts/UserContext';
import { getDocSnapshot$ } from '../../lib/firestore';

type UpdateAvailabilityModalProps = {
    show: boolean;
    availability: UserDataAvailability;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
    forModal: boolean;
};

function UpdateAvailabilityModal({
    availability,
    forModal,
    show,
    onHide,
}: UpdateAvailabilityModalProps): JSX.Element {
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
                <AvailabilityMap
                    forModal={forModal}
                    availability={availability}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cancel</Button>
                <Button onClick={onHide}>Update</Button>
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
                    // onDayClick
                    // showDoubleView
                />
                <Button type="button" onClick={() => setModalShow(true)}>
                    Edit Availability
                </Button>
                <UpdateAvailabilityModal
                    forModal
                    availability={userData.availability}
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
