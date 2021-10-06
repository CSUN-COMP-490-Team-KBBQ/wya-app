import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from './LoginPage';
import { BrowserRouter } from 'react-router-dom';

it('renders component', () => {
    const { queryAllByText } = render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    );
    expect(queryAllByText('Login Page')).toBeTruthy();
});