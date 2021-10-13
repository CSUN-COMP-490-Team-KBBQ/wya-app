import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../../contexts/UserContext', () => {
    return {
        UserAuthProvider: ({ children }: any): JSX.Element => {
            return <div>{children}</div>;
        },
        useUserContext: () => null,
    };
});

it('renders component', () => {
    const { queryAllByText } = render(<App />);
    expect(queryAllByText('Welcome! Login to get started.')).toBeTruthy();
});
