import {
    getAuth,
    signOut,
    signInWithEmailAndPassword,
    User,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import app from './firebase';

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
    email: string,
    password: string
): Promise<User> => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCreds) => {
                resolve(userCreds.user);
            })
            .catch(reject);
    });
};

export default auth;
