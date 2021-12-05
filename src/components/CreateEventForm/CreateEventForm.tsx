import React from 'react';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 as uuid } from 'uuid';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import ReCAPTCHA from 'react-google-recaptcha';
import Recaptcha from '../Recaptcha/Recaptcha';
import { createEvent } from '../../lib/firestore';
import { useUserContext } from '../../contexts/UserContext';

import './CreateEventForm.css';
import 'rc-time-picker/assets/index.css';

interface Guest {
    uid: string;
}

interface GuestListProps {
    guests: { [key: string]: Guest };
    updateGuests: React.Dispatch<
        React.SetStateAction<{ [key: string]: Guest }>
    >;
}

export function GuestList(props: GuestListProps): JSX.Element {
    const { guests, updateGuests } = props;
    const inputRef = React.useRef<HTMLInputElement>();
    const onClickHandler = () => {
        if (inputRef.current) {
            const newGuestUID = inputRef.current.value;
            guests[`${newGuestUID}`] = { uid: newGuestUID };
            updateGuests({ ...guests });
            inputRef.current.value = '';
        }
    };
    return (
        <div>
            <h4>Guest List</h4>
            <Row>
                <ListGroup>
                    {Object.keys(guests).map((guest) => (
                        <ListGroup.Item key={uuid()}>{guest}</ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
            <Row>
                <Col>
                    <FloatingLabel controlId="addGuest" label="Guest UID">
                        <Form.Control
                            type="text"
                            placeholder="Guest UID"
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
    setFormHook?: React.Dispatch<React.SetStateAction<any>>;
}

export default function CreateEventForm(
    props: CreateEventFormProps
): JSX.Element {
    const { setFormHook } = props;
    const { user } = useUserContext();
    const history = useHistory();
    const [guests, updateGuests] = React.useState<{
        [key: string]: Guest;
    }>({});
    const recaptchaRef = React.useRef<ReCAPTCHA>(null);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const currentDate = String(`${yyyy}-${mm}-${dd}`);
    const now = moment().startOf('hour');

    const [startTimeValue, setStartTimeValue] =
        React.useState<moment.Moment>(now);
    const [endTimeValue, setEndTimeValue] = React.useState<moment.Moment>(now);

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        // eslint-disable-next-line
        let formValue = Object.fromEntries(formData.entries()) as any;
        formValue = { ...formValue, guests };
        // eslint-disable-next-line
        console.log('USER_CREATE_EVENT', formValue);
        if (setFormHook) setFormHook(formValue);

        try {
            await recaptchaRef.current!.executeAsync();
            const eventId = await createEvent(formValue);
            history.push(`/event/${eventId}`);
        } catch (error) {
            // eslint-disable-next-line
            console.error(error);
        }
    };
    return (
        <Form data-testid="CreateEventForm" onSubmit={onSubmitHandler}>
            <input type="hidden" name="hostId" value={user?.uid} />
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
                        controlId="eventStartDate"
                        label="Event Start"
                    >
                        <Form.Control
                            type="date"
                            placeholder="Event Start"
                            name="startDate"
                            min={currentDate}
                        />
                    </FloatingLabel>
                </Col>

                <Col>
                    <FloatingLabel controlId="eventEndDate" label="Event End">
                        <Form.Control
                            type="date"
                            placeholder="Event End"
                            name="endDate"
                            min={currentDate}
                        />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Day Start</h4>
                    <TimePicker
                        className="timePicker-input"
                        placement="bottomRight"
                        placeholder="StartTime"
                        showSecond={false}
                        minuteStep={15}
                        value={startTimeValue}
                        onChange={setStartTimeValue}
                        name="startTime"
                    />
                </Col>
                <Col>
                    <h4>Day End</h4>
                    <TimePicker
                        className="timePicker-input"
                        placement="bottomRight"
                        placeholder="FinishTime"
                        showSecond={false}
                        minuteStep={15}
                        value={endTimeValue}
                        onChange={setEndTimeValue}
                        name="endTime"
                    />
                </Col>
            </Row>

            <Row>
                <GuestList guests={guests} updateGuests={updateGuests} />
            </Row>

            <Row>
                <Button type="submit">Create</Button>
            </Row>
            <Recaptcha recaptchaRef={recaptchaRef} />
        </Form>
    );
}
