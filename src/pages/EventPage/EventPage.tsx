import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityMap from '../../components/AvailabilityMap/AvailabilityMap';

import EventData from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';

function AddAvailabiliyModal({ days, show, onHide }: any): JSX.Element {
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
                    days={days}
                    handleClicks={(x: any, y: any) =>
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

    // Mock data for availability
    const days = ['Thur Oct 14', 'Fri Oct 15', 'Sat Oct 16'];

    React.useEffect(() => {
        return getDocSnapshot$(`/events/${match.params.id}`, {
            next: (snapshot) => {
                setEventData(snapshot.data() as EventData);
            },
        });
    }, []);

    return (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(eventData || {}, null, 2)}</pre>

            <h2>Group Availabilities</h2>
            <AvailabilityMap days={days} handleClicks={() => undefined} />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabiliyModal
                days={days}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}
