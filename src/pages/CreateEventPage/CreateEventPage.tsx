import React from 'react';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import EventData from '../../interfaces/EventData';

import './CreateEventPage.css';

export default function CreateEventPage(): JSX.Element {
    // eslint-disable-next-line
    const [form, setForm] = React.useState<EventData>();
    return (
        <div>
            <h1>CreateEventPage</h1>
            <div>
                <CreateEventForm setFormHook={setForm} />
            </div>
        </div>
    );
}
