import React from 'react';
import { render } from '@testing-library/react';
import AvailabilityMap from './AvailabilityMap';

it('renders component', () => {
    const { queryByText } = render(
        <AvailabilityMap
            days={['Monday', 'Tuesday']}
            handleClicks={() => undefined}
        />
    );
    expect(queryByText('Monday')).toBeTruthy();
});
