import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage(): JSX.Element {
    return (
        <div>
            <h1>Register Page</h1>
            <RegisterForm />
            <div>
                Have an account? Login&nbsp;
                <Link to="/login">here</Link>
            </div>
        </div>
    );
}
