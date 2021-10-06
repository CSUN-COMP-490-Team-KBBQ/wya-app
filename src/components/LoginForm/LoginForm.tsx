import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './LoginForm.css';

export default function LoginForm(): JSX.Element {
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formValue = Object.fromEntries(formData.entries());
        // eslint-disable-next-line
        console.log('USER_LOGIN', formValue);
    };

    return (
        <Form onSubmit={onSubmitHandler} className="login-form">
            <Form.Group as={Row} controlId="loginEmail">
                <Form.Label column sm={2}>
                    Email
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="email"
                        name="email"
                        className="form-input"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="loginPassword">
                <Form.Label column sm={2}>
                    Password
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="password"
                        name="password"
                        className="form-input"
                    />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">Login</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}
