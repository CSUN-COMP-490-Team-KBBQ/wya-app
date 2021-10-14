import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvailabilityMap from '../../components/AvailabilityMap/AvailabilityMap';

import EventData from '../../interfaces/Event';
import { getDocSnapshot$ } from '../../lib/firestore';

// Mock data for availability
const days = ['Thur Oct 14', 'Fri Oct 15', 'Sat Oct 16'];

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

            <h2>Group Availabilities</h2>
            {/* 
                handleClicks is included to show implementation for adding availability,
                when only displaying data handle click will be void
            */}
            <AvailabilityMap
                days={days}
                handleClicks={(x: any, y: any) => alert(`Clicked ${x}, ${y}`)}
            />
            <Button type="button">add Availability</Button>
        </div>
    );
}
