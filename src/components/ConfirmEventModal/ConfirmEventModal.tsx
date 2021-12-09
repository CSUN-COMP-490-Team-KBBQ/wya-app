import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';

import EventData from '../../interfaces/EventData';
import HeatMapData from '../../interfaces/HeatMapData';
import { updateEvent } from '../../lib/firestore';

import './ConfirmEventModal.css';

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

    // prepping Select component options
    const dayOptions = xData.map((time) => ({ value: time, label: time }));
    const timeOptions = yData.map((time) => ({ value: time, label: time }));

    // defining Select component onChange values
    const [day, setDay] = React.useState<string>();
    const [startTime, setStartTime] = React.useState<string>();
    const [endTime, setEndTime] = React.useState<string>();

    // defining modal visability handlers
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
                            onChange={(opt) => setDay(opt!.value)}
                        />
                        <Select
                            className="confirm-event-options"
                            options={timeOptions}
                            isSearchable={false}
                            placeholder="Starts"
                            onChange={(opt) => setStartTime(opt!.value)}
                        />
                        <Select
                            className="confirm-event-options"
                            options={timeOptions}
                            isSearchable={false}
                            placeholder="Ends"
                            onChange={(opt) => setEndTime(opt!.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Update Event</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
