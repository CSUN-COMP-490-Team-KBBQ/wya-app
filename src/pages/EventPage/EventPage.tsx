import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityHeatMap from '../../components/AvailabilityHeatMap/AvailabilityHeatMap';
import EventData, { EventDataAvailability } from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';
import HeatMapData from '../../interfaces/HeatMap';
import {
    prepareGroupAvailabilityData,
    prepareModalAvailabilityData,
    formatXDays,
    getYTimes,
    getXDays,
} from '../../lib/AvailabilityDataHelper';

// eslint-disable-next-line
type AddAvailabilityModalProps = {
    heatMapData: HeatMapData;
    show: boolean;
    onHide: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

function AddAvailabilityModal({
    heatMapData,
    show,
    onHide,
}: AddAvailabilityModalProps): JSX.Element {
    const { yData, xData, mapData, zeroState } = heatMapData;

    const [userAvailabilityData, setUserAvailabilityData] =
        React.useState<number[][]>(zeroState);

    const handleClick = (x: number, y: number) => {
        const newUserAvailabilityData = [...userAvailabilityData];
        if (newUserAvailabilityData[y][x] === 0)
            newUserAvailabilityData[y][x] = 1;
        else newUserAvailabilityData[y][x] = 0;

        setUserAvailabilityData(newUserAvailabilityData);
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
                    data={userAvailabilityData}
                    yLabels={yData}
                    xLabels={xData}
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
    const [modalShow, setModalShow] = React.useState<boolean>(false);

    const [heatMapData, setHeatMapData] = React.useState<HeatMapData>();

    React.useEffect(() => {
        return getDocSnapshot$(`/events/${match.params.id}`, {
            next: (snapshot) => {
                const event = snapshot.data() as EventData;
                const tempYTimes = getYTimes(event.availability);
                const tempXDays = getXDays(tempYTimes, event.availability);
                setHeatMapData({
                    yData: tempYTimes,
                    xData: formatXDays(tempXDays),
                    mapData: prepareGroupAvailabilityData(
                        tempYTimes,
                        tempXDays,
                        event.availability
                    ),
                    zeroState: prepareModalAvailabilityData(
                        tempYTimes.length,
                        tempXDays.length
                    ),
                });
            },
        });
    }, []);

    return heatMapData !== undefined ? (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(heatMapData.mapData || {}, null, 2)}</pre>
            <h2>Group Availabilities</h2>
            <AvailabilityHeatMap
                data={heatMapData.mapData}
                yLabels={heatMapData.yData}
                xLabels={heatMapData.xData}
                onClick={() => undefined}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabilityModal
                heatMapData={heatMapData}
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
