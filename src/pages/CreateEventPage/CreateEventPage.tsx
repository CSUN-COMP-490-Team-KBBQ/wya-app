import React from 'react';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import EventData from '../../interfaces/EventData';

import './CreateEventPage.css';

export default function CreateEventPage(): JSX.Element {
    const [form, setForm] = React.useState<EventData>();
    return (
        <div>
            <h1>CreateEventPage</h1>
            <div>
                <CreateEventForm setFormHook={setForm} />
            </div>
            {/* Just for backend team to see the submission of the form */}
            <pre>{JSON.stringify(form, null, 2)}</pre>
        </div>
    );
}
