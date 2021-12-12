import React from 'react';
import { render } from '@testing-library/react';
import Page from './Page';

it('renders component', () => {
    const { queryByText } = render(<Page />);
    expect(queryByText('PageComponent')).toBeTruthy();
});
