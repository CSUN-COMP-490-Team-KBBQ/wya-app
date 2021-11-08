import React from 'react';
import { render } from '@testing-library/react';
import ProfilePage from './ProfilePage';

it('renders component', () => {
    const { queryByText } = render(<ProfilePage />);
    expect(queryByText('ProfilePage')).toBeTruthy();
});
