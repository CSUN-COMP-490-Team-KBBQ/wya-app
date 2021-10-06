import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterPage from './RegisterPage';

it('renders component', () => {
    const { queryAllByText } = render(
        <BrowserRouter>
            <RegisterPage />
        </BrowserRouter>
    );
    expect(queryAllByText('Register Page')).toBeTruthy();
});
