import React from 'react';
import { render } from '@testing-library/react';
import AvailabilityMap from './AvailabilityMap';

it('renders component', () => {
    const { queryByText } = render(<AvailabilityMap />);
    expect(queryByText('AvailabilityMapComponent')).toBeTruthy();
});
