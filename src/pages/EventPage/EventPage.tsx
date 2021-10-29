import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityHeatMap from '../../components/AvailabilityHeatMap/AvailabilityHeatMap';

import EventData, { EventDataAvailability } from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';

// eslint-disable-next-line
type AddAvailabilityModalProps = {
    show: boolean;
    groupAvailability: EventDataAvailability;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
    // forModal: boolean;
};

function AddAvailabilityModal({
    groupAvailability,
    show,
    onHide,
}: // forModal,
AddAvailabilityModalProps): JSX.Element {
    const yTimes = Object.keys(groupAvailability).sort();
    const xDays = Object.keys(groupAvailability[yTimes[0]]).sort();
    const xDaysFormated = xDays.map((timeStamp) =>
        new Date(Number(timeStamp)).toDateString().slice(0, 15)
    );

    const zeroState = new Array(yTimes.length)
        .fill(0)
        .map(() => new Array(xDays.length).fill(0));

    const [userAvailability, setUserAvailability] =
        React.useState<number[][]>(zeroState);

    const handleClick = (x: number, y: number) => {
        const newUserAvailability = [...userAvailability];
        if (newUserAvailability[y][x] === 0) newUserAvailability[y][x] = 1;
        else newUserAvailability[y][x] = 0;

        setUserAvailability(newUserAvailability);
    };

    const handleCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailability(zeroState);
        return onHide ? onHide(e) : undefined;
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
                    // forModal={forModal}
                    availability={userAvailability}
                    xDaysFormated={xDaysFormated}
                    yTimes={yTimes}
                    onClick={handleClick}
                />
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={onHide}> */}
                <Button variant="secondary" onClick={(e) => handleCancel(e)}>
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
                const event = snapshot.data() as EventData;
                setEventData(event);
            },
        });
    }, []);

    return eventData ? (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(eventData || {}, null, 2)}</pre>

            <h2>Group Availabilities</h2>
            {/* <AvailabilityHeatMap
                forModal={false}
                availability={eventData.availability}
            /> */}
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabilityModal
                // forModal
                groupAvailability={eventData.availability}
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
