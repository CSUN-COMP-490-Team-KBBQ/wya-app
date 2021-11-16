import React from 'react';
import { User } from 'firebase/auth';
import auth from '../lib/auth';

type UserState = {
    pending: boolean;
    user: User | null;
};

const UserContext = React.createContext<UserState>({
    pending: true,
    user: null,
});

export const UserAuthProvider: React.FC = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState<UserState>({
        pending: true,
        user: null,
    });

    React.useEffect(() => {
        return auth.onAuthStateChanged((user) =>
            setCurrentUser({ pending: false, user })
        );
    }, []);

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserState => {
    const user = React.useContext(UserContext);
    if (user === undefined) {
        throw new Error(
            'useUserContext hook must be used within an UserAuthProvider'
        );
    }
    return user;
};
