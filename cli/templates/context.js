module.exports = function context(name) {
    return `\
import React from 'react';

const ${name}Context = React.createContext({});

export default ${name}Context;
`;
};