import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage(): JSX.Element {
    return (
        <div>
            <h1>Login Page</h1>
            <LoginForm />
            <div>
                Don&apos;t have an account? Register&nbsp;
                <Link to="/register">here</Link>
            </div>
        </div>
    );
}
