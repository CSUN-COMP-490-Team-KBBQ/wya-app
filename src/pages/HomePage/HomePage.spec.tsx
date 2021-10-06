import React from 'react';
import { render } from '@testing-library/react';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

it('renders component', () => {
    const { queryAllByText } = render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    expect(queryAllByText('Home Page')).toBeTruthy();
});