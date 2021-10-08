module.exports = function component(name) {
    return `\
import React from 'react';
import './${name}.css';

interface ${name}Props {};

export default function ${name}(props: ${name}Props) {
    return (
        <h1>${name}Component</h1>
    );
};
`;
};