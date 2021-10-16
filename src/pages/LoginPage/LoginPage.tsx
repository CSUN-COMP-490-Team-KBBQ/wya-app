import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

import './LoginPage.css';

export default function LoginPage(): JSX.Element {
    return (
        <div>
            <img src="wya test 4.png" alt="logo" />
            <h1>Log In</h1>
            <div className="form-container">
                <LoginForm />
                <div className="form-footer">
                    Don&apos;t have an account? Register&nbsp;
                    <Link to="/register">here</Link>
                </div>
            </div>
        </div>
    );
}
