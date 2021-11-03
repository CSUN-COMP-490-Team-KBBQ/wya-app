import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import './PrivateRoute.css';

export default function PrivateRoute(props: RouteProps): JSX.Element {
    const user = useUserContext();
    const { path, component } = props;

    return user ? (
        <Route path={path} exact component={component} />
    ) : (
        <Redirect to="/" />
    );
}
