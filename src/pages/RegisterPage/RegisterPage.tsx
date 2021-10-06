import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import './RegisterPage.css';

export default function RegisterPage(): JSX.Element {
    return (
        <div>
            <h1>Register Page</h1>
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
