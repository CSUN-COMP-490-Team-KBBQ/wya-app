import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityHeatMap from '../../components/AvailabilityHeatMap/AvailabilityHeatMap';
import EventData, { EventDataAvailability } from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';
import prepareGroupAvailabilityData, {
    prepareModalAvailabilityData,
    formatXDays,
    getYTimes,
    getXDays,
} from '../../lib/AvailabilityDataHelper';

// eslint-disable-next-line
type AddAvailabilityModalProps = {
    xLabels: string[];
    yLabels: string[];
    show: boolean;
    groupAvailability: EventDataAvailability;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
    // forModal: boolean;
};

function AddAvailabilityModal({
    xLabels,
    yLabels,
    groupAvailability,
    show,
    onHide,
}: // forModal,
AddAvailabilityModalProps): JSX.Element {
    // const yTimes = Object.keys(groupAvailability).sort();
    // const xDays = Object.keys(groupAvailability[yTimes[0]]).sort();

    const yLen = yLabels.length;
    const xLen = xLabels.length;

    console.log(`x: ${xLabels.length}, Y:${yLabels.length}`);

    const zeroState: number[][] = prepareModalAvailabilityData(yLen, xLen);

    const [userAvailabilityData, setUserAvailabilityData] =
        React.useState<number[][]>(zeroState);

    const handleClick = (x: number, y: number) => {
        const tempUserAvailabilityData = [...userAvailabilityData];
        if (tempUserAvailabilityData[y][x] === 0)
            tempUserAvailabilityData[y][x] = 1;
        else tempUserAvailabilityData[y][x] = 0;

        setUserAvailabilityData(tempUserAvailabilityData);
    };

    const handleCancel = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(zeroState);
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
                    availability={userAvailabilityData}
                    yTimes={yLabels}
                    xDaysFormated={xLabels}
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
    const [yTimes, setYTimes] = React.useState<string[]>([]);
    const [xDays, setXDays] = React.useState<string[]>([]);
    // const [availabilityData, setAvailabilityData] = React.useState<number[][]>([
    //     [],
    // ]);

    React.useEffect(() => {
        return getDocSnapshot$(`/events/${match.params.id}`, {
            next: (snapshot) => {
                const event = snapshot.data() as EventData;
                setEventData(event);
                const tempYTimes = getYTimes(event.availability);
                setYTimes(tempYTimes);
                setXDays(getXDays(tempYTimes, event.availability));
            },
        });
    }, []);

    // React.useEffect(() => {
    //     if (eventData !== undefined) {
    //         setAvailabilityData(
    //             prepareAvailabilityData(yTimes, xDays, eventData.availability)
    //         );
    //     }
    // }, [eventData]);

    return eventData ? (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(eventData || {}, null, 2)}</pre>
            <h2>Group Availabilities</h2>
            <AvailabilityHeatMap
                availability={prepareGroupAvailabilityData(
                    yTimes,
                    xDays,
                    eventData.availability
                )}
                yTimes={yTimes}
                xDaysFormated={formatXDays(xDays)}
                onClick={() => undefined}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabilityModal
                yLabels={yTimes}
                xLabels={formatXDays(xDays)}
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
