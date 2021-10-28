import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityMap from '../../components/AvailabilityMap/AvailabilityMap';

import EventData, { EventDataAvailability } from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';

// eslint-disable-next-line
type AddAvailabilityModalProps = {
    show: boolean;
    availability: EventDataAvailability;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
    forModal: boolean;
};

function AddAvailabilityModal({
    availability,
    show,
    onHide,
    forModal,
}: AddAvailabilityModalProps): JSX.Element {
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
                <AvailabilityMap
                    forModal={forModal}
                    availability={availability}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button onClick={onHide}>Submit</Button>
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
    const [eventData, setEventData] = React.useState<EventData>();
    const [modalShow, setModalShow] = React.useState<boolean>(false);

    React.useEffect(() => {
        return getDocSnapshot$(`/events/${match.params.id}`, {
            next: (snapshot) => {
                setEventData(snapshot.data() as EventData);
            },
        });
    }, []);

    return eventData ? (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(eventData || {}, null, 2)}</pre>

            <h2>Group Availabilities</h2>
            <AvailabilityMap
                forModal={false}
                availability={eventData.availability}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabilityModal
                forModal
                availability={eventData.availability}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    ) : (
        <div>
            <h1>EventPage</h1>
        </div>
    );
}
