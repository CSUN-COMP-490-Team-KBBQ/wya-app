import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import './PrivateRoute.css';

interface PrivateRouteProps {
    path: string;
    component: React.FC;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
    const user = useUserContext();
    const { path, component } = props;

    return user ? (
        <Route path={path} exact component={component} />
    ) : (
        <Redirect to="/" />
    );
}
