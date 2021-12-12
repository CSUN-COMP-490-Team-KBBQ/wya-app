import React from 'react';
import { render } from '@testing-library/react';
import CalendarPage from './CalendarPage';

jest.mock('firebase/app');
jest.mock('firebase/auth');
jest.mock('firebase/firestore');
// jest.mock('../../contexts/UserContext', () => {
//     return {
//         // eslint-disable-next-line
//         UserAuthProvider: ({ children }: any): JSX.Element => {
//             return <div>{children}</div>;
//         },
//         useUserContext: () => ({ pending: false, user: null }),
//     };
// });

it('renders component', () => {
    const { queryByText } = render(<CalendarPage />);
    expect(queryByText('CalendarPage')).toBeTruthy();
});
