import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 as uuid } from 'uuid';
import * as firestore from '../../lib/firestore';

import './CreateEventForm.css';

interface GuestListProps {
    guests: string[];
    updateGuests: React.Dispatch<React.SetStateAction<string[]>>;
}

export function GuestList(props: GuestListProps): JSX.Element {
    const { guests, updateGuests } = props;
    const inputRef = React.useRef<HTMLInputElement>();
    const onClickHandler = () => {
        if (inputRef.current) {
            const newGuestName = inputRef.current.value;
            updateGuests([...guests, newGuestName]);
            inputRef.current.value = '';
        }
    };
    return (
        <div>
            <h4>Guest List</h4>
            <Row>
                <ListGroup>
                    {guests.map((guest) => (
                        <ListGroup.Item key={uuid()}>{guest}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
            <Row>
                <Col>
                    <FloatingLabel controlId="addGuest" label="Guest Name">
                        <Form.Control
                            type="text"
                            placeholder="Guest Name"
                            ref={(node: HTMLInputElement) => {
                                inputRef.current = node;
                            }}
                        />
                    </FloatingLabel>
                </Col>
                <Col>
                    <Button type="button" onClick={onClickHandler}>
                        Add Guest
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

interface CreateEventFormProps {
    // eslint-disable-next-line
    setFormHook: React.Dispatch<React.SetStateAction<any>>;
}

export default function CreateEventForm(
    props: CreateEventFormProps
): JSX.Element {
    const { setFormHook } = props;

    const [guests, updateGuests] = React.useState<string[]>([]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        // eslint-disable-next-line
        let formValue = Object.fromEntries(formData.entries()) as any;
        formValue = { ...formValue, guests };
        // eslint-disable-next-line
        console.log('USER_CREATE_EVENT', formValue);
        if (setFormHook) setFormHook(formValue);
        firestore.default.createEvent(formValue);
    };

    return (
        <Form data-testid="CreateEventForm" onSubmit={onSubmitHandler}>
            <input type="hidden" name="hostId" value="Host1" />
            <input type="hidden" name="eventId" value={uuid()} />
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
                <GuestList guests={guests} updateGuests={updateGuests} />
            </Row>

            <Row>
                <Button type="submit">Create</Button>
            </Row>
        </Form>
    );
}
