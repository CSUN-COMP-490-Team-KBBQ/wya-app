import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { User } from 'firebase/auth';
import auth from '../lib/auth';

const UserContext = React.createContext<User | null>(null);

export const UserAuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);
    const [pending, setPending] = React.useState<boolean>(true);

    React.useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    if (pending) {
        return (
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                }}
            >
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): User | null => {
    const user = React.useContext(UserContext);
    if (user === undefined) {
        throw new Error(
            'useUserContext hook must be used within an UserAuthProvider'
        );
    }
    return user;
};
