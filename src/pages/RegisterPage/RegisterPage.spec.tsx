import React from 'react';
import { render } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { BrowserRouter } from 'react-router-dom';

it('renders component', () => {
    const { queryAllByText } = render(
        <BrowserRouter>
            <RegisterPage />
        </BrowserRouter>
    );
    expect(queryAllByText('Register Page')).toBeTruthy();
});