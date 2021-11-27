import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

import EventData from '../../interfaces/EventData';
import HeatMapData from '../../interfaces/HeatMapData';

import './ConfirmEventModal.css';

function ConfirmEventForm(props: {
    event: EventData;
    days: string[];
    times: string[];
}): JSX.Element {
    const { event, days, times } = props;
    const dayOptions = days.map((time) => ({ value: time, label: time }));
    const timeOptions = times.map((time) => ({ value: time, label: time }));

    const [day, setDay] = React.useState<string>(dayOptions[0].value);
    const [startTime, setStartTime] = React.useState<string>(
        timeOptions[0].value
    );
    const [endTime, setEndTime] = React.useState<string>(timeOptions[1].value);

    return (
        <div>
            <h2>{event.name.toUpperCase()}</h2>
            <h5>Description</h5>
            <p>{event.description}</p>
            <h5>Guests</h5>
            <p>guest list</p>
            <h5>Date</h5>
            <Select
                className="confirm-event-options"
                options={dayOptions}
                isSearchable={false}
                placeholder="Day"
                value={{ value: day, label: day }}
                onChange={(opt) => setDay(opt!.value)}
            />
            <Select
                className="confirm-event-options"
                options={timeOptions}
                isSearchable={false}
                placeholder="Starts"
                value={{ value: startTime, label: startTime }}
                onChange={(opt) => setStartTime(opt!.value)}
            />
            <Select
                className="confirm-event-options"
                options={timeOptions}
                isSearchable={false}
                placeholder="Ends"
                value={{ value: endTime, label: endTime }}
                onChange={(opt) => setEndTime(opt!.value)}
            />
        </div>
    );
}

interface ConfirmEventModalProps {
    event: EventData;
    heatMapData: HeatMapData;
}

export default function ConfirmEventModal(
    props: ConfirmEventModalProps
): JSX.Element {
    const [show, setShow] = React.useState<boolean>(false);
    const { event, heatMapData } = props;
    const { yData, xData } = heatMapData;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button type="button" onClick={handleShow}>
                Confirm Event
            </Button>

            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirm Event
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ConfirmEventForm
                        event={event}
                        days={xData}
                        times={yData}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Update Event</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
