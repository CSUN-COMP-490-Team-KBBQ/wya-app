import React from 'react';
import Container from 'react-bootstrap/Container';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import Page from '../../components/Page/Page';
import './CreateEventPage.css';

export default function CreateEventPage(): JSX.Element {
    return (
        <Page>
            <h1 id="createEventContent">Create Event</h1>
            <Container fluid>
                <CreateEventForm />
            </Container>
        </Page>
    );
}
