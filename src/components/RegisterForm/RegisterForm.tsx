import React, { useRef } from 'react';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useHistory, Link } from 'react-router-dom';
import {
    Form as FormikForm,
    withFormik,
    FormikProps,
    FormikErrors,
    Field,
} from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import Recaptcha from '../Recaptcha/Recaptcha';
import RegisterFormData from '../../interfaces/RegisterFormData';
import { registerUser, logIn } from '../../lib/auth';
import { useUserContext } from '../../contexts/UserContext';

import './RegisterForm.css';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordRepeat: string;
}

interface OtherProps {
    message: string;
}

function isValidEmail(value: string) {
    let emailValid = true;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        emailValid = false;
    }
    return emailValid;
}

function isValidName(value: string) {
    let nameValid = true;
    if (!/^[a-z ,.'-]+$/i.test(value)) {
        nameValid = false;
    }
    return nameValid;
}

function isValidPassword(value: string) {
    let passValid = true;
    if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i.test(
            value
        )
    ) {
        passValid = false;
    }
    return passValid;
}

function matchesPassword(password: string, passwordRepeat: string) {
    let passMatches = true;
    if (passwordRepeat !== password) {
        passMatches = false;
    }
    return passMatches;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const { touched, errors, isSubmitting, message } = props;
    const history = useHistory();
    const { user } = useUserContext();
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    React.useEffect(() => {
        if (user) {
            // eslint-disable-next-line
            console.log('User already logged in, redirecting to home page');
            history.push('/calendar');
        }
    });
    return (
        <Container>
            <FormikForm>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{ margin: 0 }}>
                            First Name
                        </Form.Label>
                        <Field
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                        />
                        {touched.firstName && errors.firstName && (
                            <div>{errors.firstName}</div>
                        )}
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label style={{ margin: 0 }}>Last Name</Form.Label>

                        <Field
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                        />
                        {touched.lastName && errors.lastName && (
                            <div>{errors.lastName}</div>
                        )}
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group controlId="registerEmail">
                        <Form.Label style={{ margin: 0 }}>Email</Form.Label>

                        <Field type="email" name="email" placeholder="Email" />
                        {touched.email && errors.email && (
                            <div text-color="red">{errors.email}</div>
                        )}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label style={{ margin: 0 }}>Password</Form.Label>

                        <Field
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        {touched.password && errors.password && (
                            <div>{errors.password}</div>
                        )}
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label style={{ margin: 0 }}>
                            Re-Enter Password
                        </Form.Label>

                        <Field
                            type="password"
                            name="passwordRepeat"
                            placeholder="Re-Enter Password"
                        />
                        {touched.password && errors.passwordRepeat && (
                            <div>{errors.passwordRepeat}</div>
                        )}
                    </Form.Group>
                </Row>
                <Button
                    type="submit"
                    className="form-button"
                    disabled={isSubmitting}
                >
                    Register
                </Button>
                <Form.Text>
                    <Link className="clickable-link" to="/login">
                        Have an account?
                    </Link>
                </Form.Text>
                <Recaptcha recaptchaRef={recaptchaRef} />
            </FormikForm>
        </Container>
    );
};

// The type of props form receives
interface MyFormProps {
    initialFirstName?: string;
    initialLastName?: string;
    initialEmail?: string;
    message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: (props) => {
        return {
            firstName: props.initialFirstName || '',
            lastName: props.initialLastName || '',
            email: props.initialEmail || '',
            password: '',
            passwordRepeat: '',
        };
    },

    // Add a custom validation function (can also be async)
    validate: (values: FormValues) => {
        // eslint-disable-next-line
        let errors: FormikErrors<FormValues> = {};
        // validate first name
        if (!values.firstName) {
            errors.firstName = 'Required';
        } else if (!isValidName(values.firstName)) {
            errors.firstName = 'First name may not contain special characters';
        }
        // validate last name
        if (!values.lastName) {
            errors.lastName = 'Required';
        } else if (!isValidName(values.lastName)) {
            errors.firstName = 'Last name may not contain special characters';
        }
        // validate email
        if (!values.email) {
            errors.email = 'Required';
        } else if (!isValidEmail(values.email)) {
            errors.email = 'Invalid email address';
        }
        // validate password
        if (!values.password) {
            errors.password = 'Required';
        } else if (!isValidPassword(values.password)) {
            errors.password =
                'Password must contain at least 8 characters, including:' +
                '\n  1 lowercase letter' +
                '\n  1 uppercase letter' +
                '\n  1 number' +
                '\n  1 special character';
        }
        // check passwords match
        if (!values.passwordRepeat) {
            errors.passwordRepeat = 'Required';
        } else if (!matchesPassword(values.password, values.passwordRepeat)) {
            errors.passwordRepeat = 'Passwords do not match';
        }
        return errors;
    },

    handleSubmit: async (values) => {
        // do submitting things
        const history = useHistory();
        const recaptchaRef = useRef<ReCAPTCHA>(null);
        const formValue = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        };
        const { email, password } = formValue;
        try {
            await recaptchaRef.current!.executeAsync();
            const { data } = await registerUser(formValue);
            // eslint-disable-next-line
            console.log(`User successfully created!`, data);
            await logIn(email, password);
            history.push('/calendar');
        } catch (error) {
            // eslint-disable-next-line
            console.error(error);
        }
    },
})(InnerForm);

// Use <MyForm /> wherevs
// const RegisterForm = () => <MyForm message="Sign Up" />;

export default function RegisterForm() {
    const history = useHistory();
    const { user } = useUserContext();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    return <MyForm message="Sign Up" />;
}
