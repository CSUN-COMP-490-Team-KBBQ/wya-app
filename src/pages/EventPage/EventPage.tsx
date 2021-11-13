import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AvailabilityHeatMap from '../../components/AvailabilityHeatMap/AvailabilityHeatMap';
import EventData from '../../interfaces/EventData';
import { getDocSnapshot$ } from '../../lib/firestore';
import HeatMapData from '../../interfaces/HeatMapData';
import {
    getYTimesSorted,
    getXDaysSorted,
    formatXDays,
    createAvailabilityDataArray,
    createZeroStateArray,
    createPreloadArray,
} from '../../lib/AvailabilityHeatMap';
import { useUserRecordContext } from '../../contexts/UserRecordContext';

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
    const { yData, xData, preloadData } = heatMapData;

    const [userAvailabilityData, setUserAvailabilityData] =
        React.useState<number[][]>(preloadData);

    const onClickHeatMapHandle = (x: number, y: number) => {
        const newUserAvailabilityData = JSON.parse(
            JSON.stringify(userAvailabilityData)
        );
        if (newUserAvailabilityData[y][x] === 0)
            newUserAvailabilityData[y][x] = 1;
        else newUserAvailabilityData[y][x] = 0;

        setUserAvailabilityData(newUserAvailabilityData);
    };

    const onClickCancelHandle = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        setUserAvailabilityData(preloadData);
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
                    yLabels={yData}
                    xLabels={xData}
                    data={userAvailabilityData}
                    onClick={onClickHeatMapHandle}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={(e) => onClickCancelHandle(e)}
                >
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
    const userRecord = useUserRecordContext();
    const [modalShow, setModalShow] = React.useState<boolean>(false);
    const [heatMapData, setHeatMapData] = React.useState<HeatMapData>();

    React.useEffect(() => {
        if (userRecord) {
            getDocSnapshot$(`/events/${match.params.id}`, {
                next: (eventSnapshot) => {
                    const event = eventSnapshot.data() as EventData;
                    const tempYTimes = getYTimesSorted(event.availability);
                    const tempXDays = getXDaysSorted(
                        tempYTimes,
                        event.availability
                    );
                    const formatedTempXDays = formatXDays(tempXDays);
                    const zeroState = createZeroStateArray(
                        tempYTimes.length,
                        tempXDays.length
                    );

                    setHeatMapData({
                        yData: tempYTimes,
                        xData: formatedTempXDays,
                        mapData: createAvailabilityDataArray(
                            tempYTimes,
                            tempXDays,
                            event.availability
                        ),
                        preloadData:
                            Object.values(userRecord.availability).length === 0
                                ? zeroState
                                : createPreloadArray(
                                      tempYTimes,
                                      formatedTempXDays,
                                      userRecord.availability
                                  ),
                        zeroState,
                    });
                },
            });
        }
    }, [userRecord]);

    return heatMapData ? (
        <div>
            <h1>EventPage</h1>
            <h2>Group Availabilities</h2>
            <AvailabilityHeatMap
                yLabels={heatMapData.yData}
                xLabels={heatMapData.xData}
                data={heatMapData.mapData}
                onClick={() => undefined}
            />
            <Button type="button" onClick={() => setModalShow(true)}>
                add Availability
            </Button>

            <AddAvailabilityModal
                // userAvail={heatMapData.preloadData}
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
