import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './ProfilePage.css';

export default function ProfilePage(): JSX.Element {
    return (
        <div id="profilePage">
            <h1>ProfilePage</h1>
            <Form
                onSubmit={() => console.log('update')}
                className="change-password-form"
            >
                <h2>Change Password</h2>
                <hr />
                <Form.Group controlId="updatePasswordForm">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        className="form-input"
                    />
                    <Button id="passwordUpdateBtn" type="submit">
                        Update Password
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}
