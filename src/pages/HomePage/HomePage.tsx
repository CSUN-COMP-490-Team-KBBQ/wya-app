import React from 'react';
import './HomePage.css';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useUserContext } from '../../contexts/UserContext';
import { logOut } from '../../lib/auth';
import finallogo from '../../assets/wya test 4.png';

export default function HomePage(): JSX.Element {
    const user = useUserContext();
    const history = useHistory();

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
                        <Button
                            variant="light"
                            className="btn-sm"
                            onClick={() => history.push('/profile')}
                        >
                            Profile
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
                        <Link
                            to="/calendar"
                            className="btn-links btn btn-info btn-lg"
                        >
                            Current Calender
                        </Link>{' '}
                        {/* <Button variant="info" className="btn-links btn btn-lg">
                            Current Calender
                        </Button>{' '} */}
                    </div>
                </div>
            ) : (
                <div>
                    <img src={finallogo} alt="logo" />
                    <h1>
                        Welcome!{' '}
                        <Link to="/login" className="loginLink">
                            Login
                        </Link>{' '}
                        to get started.{' '}
                    </h1>
                    <h2>
                        wya? is a web-based application that will help you, your
                        friends, or your family meet up without the headache of
                        planning. We are creating a system to easily make plans
                        by stacking personal schedules so that your group will
                        be able to clearly see who&apos;s doing what and when.
                        The add-a-friend feature and overall simplicity of wya?
                        removes the need for multiple apps and lets you chat,
                        plan, and invite whomever you&apos;d like.
                    </h2>
                    <h1>
                        Our app removes all the stress when planning all the
                        fun!
                    </h1>
                </div>
            )}
        </div>
    );
}
