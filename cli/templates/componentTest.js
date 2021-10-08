module.exports = function componentTest(name) {
    return `\
import React from 'react';
import { render } from '@testing-library/react';
import ${name} from './${name}';

it('renders component', () => {
    const { queryByText } = render(<${name} />);
    expect(queryByText('${name}Component')).toBeTruthy();
});
`;
};