import React from 'react';
import { render } from '@testing-library/react';
import AvailabilityMap from './AvailabilityMap';

const availabilityStub = {
    '04:15': {
        '1635058800000': [],
        '1634972400000': [],
    },
    '04:45': {
        '1634972400000': [],
        '1635058800000': ['user3'],
    },
    '04:30': {
        '1634972400000': [],
        '1635058800000': ['user3'],
    },
    '04:00': {
        '1634972400000': ['user1'],
        '1635058800000': ['user1', 'user2'],
    },
};

it('renders component', () => {
    const { queryByText } = render(
        <AvailabilityMap availability={availabilityStub} />
    );
    expect(queryByText('Sat Oct 23 2021')).toBeTruthy();
    expect(queryByText('Sun Oct 24 2021')).toBeTruthy();

    expect(queryByText('04:00')).toBeTruthy();
    expect(queryByText('04:15')).toBeTruthy();
    expect(queryByText('04:30')).toBeTruthy();
    expect(queryByText('04:45')).toBeTruthy();
});
