import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateEventPage from './CreateEventPage';

it('renders page', () => {
    const { queryByText } = render(
        <BrowserRouter>
            <CreateEventPage />
        </BrowserRouter>
    );
    expect(queryByText('CreateEventPage')).toBeTruthy();
});
