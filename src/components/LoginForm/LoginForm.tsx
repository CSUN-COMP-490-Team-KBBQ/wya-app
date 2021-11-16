import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory, Link } from 'react-router-dom';
import { logIn } from '../../lib/auth';
import { useUserContext } from '../../contexts/UserContext';

import './LoginForm.css';

export default function LoginForm(): JSX.Element {
    const history = useHistory();
    const { user } = useUserContext();
    React.useEffect(() => {
        if (!pending && user) {
            // eslint-disable-next-line
            console.log('User already logged in, redirecting to home page');
            history.push('/');
        }
    });

    const logInHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formValue = Object.fromEntries(formData.entries());
        // eslint-disable-next-line
        console.log('USER_LOGIN', formValue);
        const { email, password } = formValue;
        logIn(email as string, password as string)
            .then(({ uid }) => {
                // eslint-disable-next-line
                console.log(`Logged in as user ${uid}`);
                history.push('/');
            })
            // eslint-disable-next-line
            .catch(console.error);
    };

    return (
        <Form onSubmit={logInHandler} className="login-form">
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
                    <Button type="submit">Log in</Button>
                    <Link id="forgot-password-link" to="/password-reset">
                        Forgot password?
                    </Link>
                </Col>
            </Form.Group>
        </Form>
    );
}
