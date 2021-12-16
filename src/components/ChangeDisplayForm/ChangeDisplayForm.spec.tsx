import React from 'react';
import { render } from '@testing-library/react';
import ChangeDisplayForm from './ChangeDisplayForm';

it('renders component', () => {
    const { queryByText } = render(<ChangeDisplayForm />);
    expect(queryByText('Old Password')).toBeTruthy();
});
