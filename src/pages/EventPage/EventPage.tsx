import React from 'react';

import EventData from '../../interfaces/Event';
import { getEventData } from '../../lib/firestore';

export default function EventPage({
    match,
}: {
    match: {
        params: {
            id: string;
        };
    };
}): JSX.Element {
    const [eventData, setEventData] = React.useState<EventData>();

    getEventData(match.params.id)
        .then((data) => {
            setEventData(data);
        })
        // eslint-disable-next-line
        .catch(console.error);
    return (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(eventData || {}, null, 2)}</pre>
        </div>
    );
}
