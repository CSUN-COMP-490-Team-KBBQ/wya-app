import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityMap, {
    AvailabilityMapProps,
} from '../../components/AvailabilityMap/AvailabilityMap';

import { EventData } from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';

export type AddAvailabilityModalProps = {
    show: boolean;
    onHide?: React.MouseEventHandler<HTMLButtonElement>;
} & AvailabilityMapProps;

function AddAvailabilityModal({
    availability,
    days,
    times,
    show,
    onHide,
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
                    availability={availability}
                    days={days}
                    times={times}
                    handleClicks={(x: number, y: number) =>
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

AddAvailabilityModal.defaultProps = {
    onHide: undefined,
};

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
                if (snapshot.exists()) {
                    setEventData(snapshot.data() as EventData);
                }
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
                days={eventData.days}
                times={eventData.times}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabilityModal
                availability={eventData.availability}
                days={eventData.days}
                times={eventData.times}
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
