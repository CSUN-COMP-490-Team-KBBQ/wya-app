import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

jest.mock('firebase/app');
jest.mock('firebase/auth');

it('renders component', () => {
    const { queryAllByText } = render(
        <BrowserRouter>
            <HomePage />
        </BrowserRouter>
    );
    expect(queryAllByText('Home Page')).toBeTruthy();
});
