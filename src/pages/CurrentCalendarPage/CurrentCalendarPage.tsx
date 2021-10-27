import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CurrentCalendarPage.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ShowEventModal({ dayEvents, show, onHide }: any): JSX.Element {
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>dayEvents={dayEvents}</Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function CurrentCalendarPage({
    match,
}: {
    match: {
        params: {
            id: string;
        };
    };
}): JSX.Element {
    const [value, onChange] = React.useState(new Date());
    const [modalShow, setModalShow] = React.useState<boolean>(false);

    // Mock data for event
    const myEvents = ['My Event 1', 'My Event 2'];

    return (
        <div>
            <header>
                <h1>CurrentCalendarPage</h1>
            </header>
            <div>
                <Calendar
                    onChange={onChange}
                    value={value}
                    calendarType="US"
                    onClickDay={() => setModalShow(true)}
                />
                <ShowEventModal
                    dayEvents={myEvents}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <Button type="submit">Edit Schedule</Button>
            </div>
        </div>
    );
}
