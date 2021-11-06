import React from 'react';
import { render } from '@testing-library/react';
import PasswordResetPage from './PasswordResetPage';

it('renders component', () => {
    const { queryByText } = render(<PasswordResetPage />);
    expect(queryByText('Password Reset')).toBeTruthy();
});
