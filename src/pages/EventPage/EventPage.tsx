import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityMap from '../../components/AvailabilityMap/AvailabilityMap';

import EventData from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';

// eslint-disable-next-line
function AddAvailabiliyModal({ availability, show, onHide }: any): JSX.Element {
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
                    availability={availability}
                    // eslint-disable-next-line
                    handleClicks={(x: any, y: any) =>
                        // eslint-disable-next-line
                        alert(`Clicked ${x}, ${y}`)
                    }
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Cancel</Button>
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
                availability={eventData.availability}
                handleClicks={() => undefined}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabiliyModal
                availability={eventData.availability}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    ) : (
        <div />
    );
}
