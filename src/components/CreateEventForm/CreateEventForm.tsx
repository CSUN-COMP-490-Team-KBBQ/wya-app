import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './CreateEventForm.css';

export default function CreateEventForm(): JSX.Element {
    return (
        <Form data-testid="CreateEventForm">
            <Row>
                <FloatingLabel controlId="eventName" label="Event Name">
                    <Form.Control
                        type="text"
                        placeholder="Event Name"
                        name="name"
                    />
                </FloatingLabel>
            </Row>

            <Row>
                <FloatingLabel
                    controlId="eventDescription"
                    label="Event Description"
                >
                    <Form.Control
                        as="textarea"
                        name="description"
                        style={{ height: '100px' }}
                        placeholder="Event Description"
                    />
                </FloatingLabel>
            </Row>

            <Row>
                <Col>
                    <FloatingLabel
                        controlId="eventStartDatetime"
                        label="Event Start"
                    >
                        <Form.Control
                            type="datetime-local"
                            placeholder="Event Start"
                            name="startDatetime"
                        />
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel
                        controlId="eventEndDatetime"
                        label="Event End"
                    >
                        <Form.Control
                            type="datetime-local"
                            placeholder="Event End"
                            name="endDatetime"
                        />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row>
                <Button type="button">Create</Button>
            </Row>
        </Form>
    );
}
