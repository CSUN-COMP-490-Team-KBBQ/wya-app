import React from 'react';
import { render } from '@testing-library/react';
import LoginForm from './LoginForm';

it('renders component', () => {
    const { queryAllByText } = render(<LoginForm />);
    expect(queryAllByText('Email')).toBeTruthy();
    expect(queryAllByText('Password')).toBeTruthy();
});