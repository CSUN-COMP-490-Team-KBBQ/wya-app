import React from 'react';
import { render } from '@testing-library/react';
import EventList from './EventList';

it('renders component', () => {
    const events = [''];
    const { queryByText } = render(
        <EventList elementId="calender-event-list" events={events} />
    );
    expect(queryByText('Events')).toBeTruthy();
});
