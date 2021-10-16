import React from 'react';
import { render } from '@testing-library/react';
import CreateEventForm from './CreateEventForm';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

it('renders component', () => {
    const { queryByTestId } = render(<CreateEventForm />);
    expect(queryByTestId('CreateEventForm')).toBeTruthy();
});
