import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PasswordResetPage from '../../pages/PasswordResetPage/PasswordResetPage';
import CreateEventPage from '../../pages/CreateEventPage/CreateEventPage';
import EventPage from '../../pages/EventPage/EventPage';
import CalendarPage from '../../pages/CalendarPage/CalendarPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import { UserAuthProvider } from '../../contexts/UserContext';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(): JSX.Element {
    return (
        <UserAuthProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/login" exact component={LoginPage} />
                    <Route path="/register" exact component={RegisterPage} />
                    <Route
                        path="/password-reset"
                        exact
                        component={PasswordResetPage}
                    />
                    <PrivateRoute
                        path="/create-event"
                        component={CreateEventPage}
                    />
                    <PrivateRoute path="/event/:id" component={EventPage} />
                    <PrivateRoute path="/calendar" component={CalendarPage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <Route path="*" exact component={NotFoundPage} />
                </Switch>
            </BrowserRouter>
        </UserAuthProvider>
    );
}
