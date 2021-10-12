import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './RegisterForm.css';
import RegisterFormData from '../../interfaces/RegisterFormData';
import { registerUser } from '../../lib/auth';

export default function RegisterForm(): JSX.Element {
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formValue: RegisterFormData = Object.fromEntries(
            formData.entries()
            // eslint-disable-next-line
        ) as any;
        // eslint-disable-next-line
        console.log('USER_REGISTER', formValue);
        const { email, password } = formValue;
        registerUser(email, password);
    };

    return (
        <Form onSubmit={onSubmitHandler} className="register-form">
            <Row>
                <Form.Group as={Col} controlId="registerFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" />
                </Form.Group>

                <Form.Group as={Col} controlId="registerLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="registerEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group>
                    <Button type="submit">Register</Button>
                </Form.Group>
            </Row>
        </Form>
    );
}
