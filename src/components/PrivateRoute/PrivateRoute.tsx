import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import PageSpinner from '../PageSpinner/PageSpinner';
import { useUserContext } from '../../contexts/UserContext';
import './PrivateRoute.css';

export default function PrivateRoute(props: RouteProps): JSX.Element {
    const { pending, user } = useUserContext();
    const { path, component } = props;

    /**
     * If pending then we show page spinner.
     * If user then we show private component.
     * Else redirect to HomePage.
     */
    if (pending) {
        return <PageSpinner />;
    }
    if (user) {
        return <Route path={path} exact component={component} />;
    }
    return <Redirect to="/" />;
}
