import React from 'react';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';

import './CreateEventPage.css';

export default function CreateEventPage(): JSX.Element {
    return (
        <div>
            <h1>CreateEventPage</h1>
            <div>
                <CreateEventForm />
            </div>
        </div>
    );
}
