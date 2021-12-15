import React from 'react';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import Page from '../../components/Page/Page';
import './CreateEventPage.css';

export default function CreateEventPage(): JSX.Element {
    return (
        <Page>
            <h1>Create Event</h1>
            <CreateEventForm />
        </Page>
    );
}
