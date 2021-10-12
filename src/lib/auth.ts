import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    User,
} from 'firebase/auth';
import axios, { AxiosResponse } from 'axios';
import app from './firebase';
import RegisterFormData from '../interfaces/RegisterFormData';

const auth = getAuth(app);

export const logIn = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCreds) => {
                resolve(userCreds.user);
            })
            .catch(reject);
    });
};

export const logOut = (): Promise<void> => {
    return signOut(auth);
};

export const registerUser = (
    data: RegisterFormData
): Promise<AxiosResponse<User>> => {
    return axios.post(
        'https://us-central1-kbbq-wya-35414.cloudfunctions.net/api/register',
        JSON.stringify(data),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

export default auth;