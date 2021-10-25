import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CurrentCalendarPage } from './CurrentCalendarPage';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');

it('renders page', () => {
    const { queryByText } = render(
        <BrowserRouter>
            <CurrentCalendarPage />
        </BrowserRouter>
    );
    expect(queryByText('CurrentCalendarPage')).toBeTruthy();
});
