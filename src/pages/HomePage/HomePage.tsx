import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useUserContext } from '../../contexts/UserContext';
import { logOut } from '../../lib/auth';

export default function HomePage(): JSX.Element {
    const user = useUserContext();
    return (
        <div>
            <h1>Home Page</h1>
            {user ? (
                <div>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    <Button variant="danger" onClick={logOut}>
                        Log out
                    </Button>
                </div>
            ) : (
                <div>
                    Welcome! <Link to="/login">Login</Link> to get started.
                </div>
            )}
        </div>
    );
}
