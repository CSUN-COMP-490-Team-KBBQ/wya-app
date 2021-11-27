import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { v4 as uuid } from 'uuid';

import './GuestList.css';

type GuestListItemProps = {
    index: number;
    guest: string;
    onRemoveHandler: (index: number) => void;
};

function GuestListItem({
    guest,
    onRemoveHandler,
    index,
}: GuestListItemProps): JSX.Element {
    return (
        <div className="guests-list-item">
            <div>{guest}</div>
            <div
                className="remove-icon-container"
                onClick={() => {
                    onRemoveHandler(index);
                }}
                aria-hidden="true"
            >
                <i className="bi bi-dash-square-fill remove-icon" />
            </div>
        </div>
    );
}

interface GuestListProps {
    guests: string[];
    updateGuests: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function GuestList({
    guests,
    updateGuests,
}: GuestListProps): JSX.Element {
    const inputRef = React.useRef<HTMLInputElement>();
    const onClickHandler = () => {
        if (inputRef.current) {
            const newGuestUID = inputRef.current.value;
            updateGuests([...guests, newGuestUID]);
            inputRef.current.value = '';
        }
    };

    const onRemoveHandler = (index: number) => {
        // removes item at index and modifies guests in place
        guests.splice(index, 1);
        updateGuests([...guests]);
    };

    return (
        <Card data-testid="guests-list">
            <Card.Header>Guests List</Card.Header>
            <Card.Body>
                <Row>
                    <ListGroup>
                        {guests.map((guest: string, index: number) => (
                            <ListGroup.Item key={uuid()}>
                                <GuestListItem
                                    guest={guest}
                                    index={index}
                                    onRemoveHandler={onRemoveHandler}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Row>
                <Row>
                    <Col sm={10}>
                        <FloatingLabel controlId="addGuest" label="Guest Email">
                            <Form.Control
                                type="text"
                                placeholder="Guest Email"
                                ref={(node: HTMLInputElement) => {
                                    inputRef.current = node;
                                }}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col sm={2} className="button-container">
                        <Button type="button" onClick={onClickHandler}>
                            Add Guest
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
