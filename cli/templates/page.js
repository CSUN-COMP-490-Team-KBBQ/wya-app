module.exports = function page(name) {
    return `\
import React from 'react';
import './${name}Page.css';

interface ${name}PageProps {};

export default function ${name}Page(props: ${name}PageProps) {
    return (
        <h1>${name}Page</h1>
    );
};
`;
};