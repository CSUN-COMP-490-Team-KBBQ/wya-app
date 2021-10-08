import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders component', () => {
    const { queryAllByText } = render(<App />);
    expect(queryAllByText('Welcome! Login to get started.')).toBeTruthy();
});
