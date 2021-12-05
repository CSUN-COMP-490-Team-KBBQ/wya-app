import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from '../../components/LoginForm/LoginForm';
import finallogo from '../../assets/wya test 4.png';
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
