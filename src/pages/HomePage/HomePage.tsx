import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage(): JSX.Element {
    return (
        <div>
            <h1>Home Page</h1>
            Welcome! <Link to="/login">Log in</Link> to get started.
        </div>
    );
}
