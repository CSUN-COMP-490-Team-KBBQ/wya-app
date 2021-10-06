import React from 'react';
import { render } from '@testing-library/react';
import RegisterForm from './RegisterForm';

it('renders component', () => {
    const { queryAllByText } = render(<RegisterForm />);
    expect(queryAllByText('First Name')).toBeTruthy();
    expect(queryAllByText('Last Name')).toBeTruthy();
    expect(queryAllByText('Email')).toBeTruthy();
    expect(queryAllByText('Password')).toBeTruthy();
});