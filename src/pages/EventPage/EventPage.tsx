import React from 'react';

import EventData from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';

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

    React.useEffect(() => {
        return getDocSnapshot$(`/events/${match.params.id}`, {
            next: (snapshot) => {
                setEventData(snapshot.data() as EventData);
            },
        });
    }, []);

    return (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(eventData || {}, null, 2)}</pre>
        </div>
    );
}
