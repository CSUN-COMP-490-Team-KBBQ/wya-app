import React from 'react';
import { render } from '@testing-library/react';
import EventList from './EventList';

it('renders component', () => {
    const { queryByText } = render(<EventList />);
    expect(queryByText('EventListComponent')).toBeTruthy();
});
