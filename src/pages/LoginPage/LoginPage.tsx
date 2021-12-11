import React from 'react';
import Container from 'react-bootstrap/Container';
import LoginForm from '../../components/LoginForm/LoginForm';
import finallogo from '../../assets/wya-logo.png';
import './LoginPage.css';

export default function LoginPage(): JSX.Element {
    return (
        <Container fluid>
            <img src={finallogo} alt="logo" />
            <h1>Log In</h1>
            <LoginForm />
        </Container>
    );
}
