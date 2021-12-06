import React from 'react';
import Container from 'react-bootstrap/Container';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import finallogo from '../../assets/wya test 4.png';
import './CreateEventPage.css';

export default function CreateEventPage(): JSX.Element {
    return (
        <Container fluid>
            <img src={finallogo} alt="logo" />
            <h1>Create Event</h1>
            <CreateEventForm />
        </Container>
    );
}
