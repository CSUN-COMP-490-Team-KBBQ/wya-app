import React from 'react';
import { render } from '@testing-library/react';
import CreateEventForm from './CreateEventForm';

it('renders component', () => {
    const { queryByTestId } = render(<CreateEventForm />);
    expect(queryByTestId('CreateEventForm')).toBeTruthy();
});
