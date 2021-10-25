import React from 'react';
import { render } from '@testing-library/react';
import CalendarPage from './CalendarPage';

it('renders component', () => {
    const { queryByText } = render(<CalendarPage />);
    expect(queryByText('CalendarPage')).toBeTruthy();
});
