import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import './RegisterPage.css';

export default function RegisterPage(): JSX.Element {
    return (
        <div>
            <img src="wya test 4.png" alt="logo" />
            <h1>Register</h1>
            <div className="form-container">
                <RegisterForm />
                <div className="form-footer">
                    Have an account? Log in&nbsp;
                    <Link to="/login">here</Link>
                </div>
            </div>
        </div>
    );
}
