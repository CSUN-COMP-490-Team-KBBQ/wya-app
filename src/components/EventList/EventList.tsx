import React from 'react';
import './EventList.css';
import { ListGroup } from 'react-bootstrap';
import { EventInfo } from '../../interfaces/User';

interface EventListProps {
    elementId: string;
    events: EventInfo[];
}

function sortEvents(events: EventInfo[]): EventInfo[] {
    return Object.values(events).sort((a, b) => {
        let result = 0;
        const aStart = Date.parse(a.startDate);
        const bStart = Date.parse(b.startDate);

        if (aStart < bStart) {
            result = -1;
        } else if (aStart > bStart) {
            result = 1;
        }

        return result;
    });
}

export default function EventList(props: EventListProps): JSX.Element {
    const { elementId, events } = props;
    const eventList = sortEvents(events);

    return (
        <div id={elementId}>
            <h1>Events</h1>
            <ListGroup className="event-list">
                {eventList.map(({ eventId, name }) => {
                    return (
                        <ListGroup.Item
                            key={eventId}
                            action
                            href={`/event/${eventId}`}
                        >
                            {name}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
}
