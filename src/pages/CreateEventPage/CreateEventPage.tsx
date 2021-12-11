import React from 'react';
import Container from 'react-bootstrap/Container';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import Page from '../../components/Page/Page';
import finallogo from '../../assets/wya-logo.png';
import './CreateEventPage.css';

export default function CreateEventPage(): JSX.Element {
    return (
        <Page>
            <h1>Create Event</h1>
            <Container fluid>
                <img
                    src={finallogo}
                    alt="logo"
                    style={{ marginTop: '100px' }}
                />
                <CreateEventForm />
            </Container>
        </Page>
    );
}
