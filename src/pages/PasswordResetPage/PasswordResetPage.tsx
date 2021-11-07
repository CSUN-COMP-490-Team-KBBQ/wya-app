import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import { passwordReset } from '../../lib/auth';
import './PasswordResetPage.css';

export default function PasswordResetPage(): JSX.Element {
    const history = useHistory();

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formValue = Object.fromEntries(formData.entries());
        const { email } = formValue;

        console.log(JSON.stringify(email));
        passwordReset(email as string)
            .then(() => {
                console.log('email sent for password reset');
                history.push('/login');
            })
            // eslint-disable-next-line
            .catch(console.error);
    };

    return (
        <div id="passwordResetPage">
            <h1>Password Reset</h1>
            <Form onSubmit={onSubmitHandler} className="password-reset-form">
                <Form.Group controlId="passwordResetEmail">
                    <Form.Label>
                        Enter the email address you signed up with to get a
                        reset password link.
                    </Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        className="form-input"
                    />
                    <Button id="passwordResetEmailBtn" type="submit">
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
