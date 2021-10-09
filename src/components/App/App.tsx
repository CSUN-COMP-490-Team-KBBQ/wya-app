import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import CreateEventPage from '../../pages/CreateEventPage/CreateEventPage';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/register" exact component={RegisterPage} />
                <Route path="/create-event" exact component={CreateEventPage} />
            </Switch>
        </Router>
    );
}
