import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import CreateEventPage from '../../pages/CreateEventPage/CreateEventPage';
import EventPage from '../../pages/EventPage/EventPage';
import CalendarPage from '../../pages/CalendarPage/CalendarPage';
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
                    <PrivateRoute
                        path="/create-event"
                        component={CreateEventPage}
                    />
                    <Route path="/event/:id" exact component={EventPage} />
                    <Route path="/calendar" exact component={CalendarPage} />
                </Switch>
            </BrowserRouter>
        </UserAuthProvider>
    );
}
