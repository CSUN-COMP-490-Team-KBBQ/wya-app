import React from 'react';
import { User } from 'firebase/auth';
import auth from '../lib/auth';

const UserContext = React.createContext<User | null>(null);

export const UserAuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState<User | null>(null);

    React.useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

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
