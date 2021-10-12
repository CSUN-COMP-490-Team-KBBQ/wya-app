import React from 'react';

import EventData from '../../interfaces/Event';

export default function EventPage({
    match,
}: {
    match: {
        params: {
            id: string;
        };
    };
}): JSX.Element {
    const fetchEventData = (): EventData => {
        /** This is where we will fetch the event data, preferablly from firestore directly */
        return {
            name: 'Event 1',
            description: 'Fake event',
            eventId: match.params.id,
            hostId: 'Host 1',
            startDatetime: 'starttime',
            endDatetime: 'endtime',
            guests: ['Guest 1', 'Guest 2', 'Guest 3'],
        };
    };

    const [eventData] = React.useState<EventData>(fetchEventData());

    return (
        <div>
            <h1>EventPage</h1>
            <pre>{JSON.stringify(eventData, null, 2)}</pre>
        </div>
    );
}
