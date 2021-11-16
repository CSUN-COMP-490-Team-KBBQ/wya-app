import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useUserContext } from '../../contexts/UserContext';
import './PrivateRoute.css';

export default function PrivateRoute(props: RouteProps): JSX.Element {
    const { pending, user } = useUserContext();
    const { path, component } = props;

    if (pending) {
        return (
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                }}
            >
                <Spinner animation="border" />
            </div>
        );
    }
    return user ? (
        <Route path={path} exact component={component} />
    ) : (
        <Redirect to="/" />
    );
}
