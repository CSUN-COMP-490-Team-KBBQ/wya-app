import React from 'react';
import Container from 'react-bootstrap/Container';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import finallogo from '../../assets/wya test 4.png';
import './RegisterPage.css';

export default function RegisterPage(): JSX.Element {
    return (
        <Container fluid>
            <img src={finallogo} alt="logo" />
            <h1>Register</h1>
            <RegisterForm />
        </Container>
    );
}
