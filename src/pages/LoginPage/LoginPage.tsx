import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import finallogo from '../../assets/wya test 4.png';
import './LoginPage.css';

export default function LoginPage(): JSX.Element {
    return (
        <div>
            <img src={finallogo} alt="logo" />
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
