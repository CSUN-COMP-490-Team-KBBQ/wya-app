import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventPage from './EventPage';

it('renders page', () => {
    const { queryByText } = render(
        <BrowserRouter>
            <EventPage match={{ params: { id: 'testid' } }} />
        </BrowserRouter>
    );
    expect(queryByText('EventPage')).toBeTruthy();
});
