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
                        <Button
                            variant="light"
                            className="btn-sm"
                            onClick={logOut}
                        >
                            Log out
                        </Button>
                    </header>
                    <h1 className="f-header">Main Menu</h1>
                    <pre className="s-header">
                        Welcome: {JSON.stringify(user.email, null, 2)}
                    </pre>
                    <div className="text-center">
                        <Link
                            to="/create-event"
                            className="btn-links btn btn-info btn-lg"
                        >
                            Create Event
                        </Link>
                    </div>
                    <div className="text-center">
                        <Button variant="info" className="btn-links btn btn-lg">
                            Current Calander
                        </Button>{' '}
                    </div>
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
