import React from 'react';
import { render } from '@testing-library/react';
import LoginForm from './LoginForm';

jest.mock('firebase/app');
jest.mock('firebase/auth');

it('renders component', () => {
    const { queryAllByText } = render(<LoginForm />);
    expect(queryAllByText('Email')).toBeTruthy();
    expect(queryAllByText('Password')).toBeTruthy();
});
