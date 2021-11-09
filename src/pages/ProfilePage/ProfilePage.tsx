import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';
import { useUserContext } from '../../contexts/UserContext';
import { logIn, changePassword } from '../../lib/auth';
import './ProfilePage.css';

export default function ProfilePage(): JSX.Element {
    const user = useUserContext();
    const [displaySuccess, setDisplaySuccess] = React.useState<string>('');
    const [displayError, setDisplayError] = React.useState<string>('');

    const DisplayPasswordChangeForm = (): JSX.Element => {
        if (displayError.length > 0 && displaySuccess.length === 0) {
            return (
                <div>
                    <Alert id="displayMessage" variant="danger">
                        {displayError}
                    </Alert>
                    <ChangePasswordForm />
                </div>
            );
        }

        if (displaySuccess.length > 0) {
            return (
                <div>
                    <Alert id="displayMessage" variant="success">
                        {displaySuccess}
                    </Alert>
                    <ChangePasswordForm />
                </div>
            );
        }

        return <ChangePasswordForm />;
    };

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const formValue = Object.fromEntries(formData.entries());
        const { oldPassword, newPassword } = formValue;

        if (newPassword === oldPassword) {
            setDisplayError('New password cannot be the same as old password!');
        } else {
            // eslint-disable-next-line
            logIn(user!.email as string, oldPassword as string)
                .then(() => {
                    changePassword(newPassword as string)
                        .then(() => {
                            setDisplaySuccess('Password successfully updated!');
                        })
                        .catch((err) => {
                            const errorResponse = `Error: ${err.code}`;
                            setDisplayError(errorResponse);
                        });
                })
                .catch((err) => {
                    const errorResponse = `Error: ${err.code}`;
                    setDisplayError(errorResponse);
                });
        }
    };

    return (
        <div id="profilePage">
            <h1>ProfilePage</h1>
            <Form onSubmit={onSubmitHandler} className="change-password-form">
                <h2>Change Password</h2>
                <hr />
                <DisplayPasswordChangeForm />
            </Form>
        </div>
    );
}
