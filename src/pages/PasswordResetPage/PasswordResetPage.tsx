import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './PasswordResetPage.css';

export default function PasswordResetPage(): JSX.Element {
    return (
        <div id="passwordResetPage">
            <h1>Password Reset</h1>
            <Form
                onSubmit={() => alert('reset password')}
                className="password-reset-form"
            >
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
