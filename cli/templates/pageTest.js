module.exports = function pageTest(name) {
    return `\
import React from 'react';
import { render } from '@testing-library/react';
import ${name}Page from './${name}Page';

it('renders component', () => {
    const { queryByText } = render(<${name}Page />);
    expect(queryByText('${name}Page')).toBeTruthy();
});
`;
};