import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useUserContext } from '../../contexts/UserContext';
import { logOut } from '../../lib/auth';

import './HomePage.css';

export default function HomePage(): JSX.Element {
    const user = useUserContext();
    return (
        <div>
            {user ? (
                <div>
                    <header>
                        <Button variant="light" onClick={logOut}>
                            Log out
                        </Button>
                    </header>
                    <h1>Main Menu</h1>
                    <pre>Welcome: {JSON.stringify(user.email, null, 2)}</pre>
                    <Link to="/create-event" className="btn btn-info">
                        Create Event
                    </Link>
                    <Button variant="info" className="btn">
                        Current Calander
                    </Button>{' '}
                </div>
            ) : (
                <div>
                    <h1>Home Page</h1>
                    Welcome! <Link to="/login">Login</Link> to get started.
                </div>
            )}
        </div>
    );
}
