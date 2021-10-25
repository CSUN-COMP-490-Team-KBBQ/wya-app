import React from 'react';
import './EventList.css';
import { ListGroup } from 'react-bootstrap';

interface EventListProps {
    elementId: string;
    events: string[];
}

export default function EventList(props: EventListProps): JSX.Element {
    const { elementId, events } = props;

    return (
        <div id={elementId}>
            <h1>Events</h1>
            <ListGroup className="event-list">
                {/* 
                    subject to change:
                    populating list depends on current events' data structure: map {id: name} 
                */}
                {Object.entries(events).map(([id, name]) => {
                    return (
                        <ListGroup.Item key={id} action href={`/event/${id}`}>
                            {name}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
}
