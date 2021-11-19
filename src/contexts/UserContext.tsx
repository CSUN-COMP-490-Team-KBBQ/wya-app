import React from 'react';
import { User } from 'firebase/auth';
import auth from '../lib/auth';

type UserState = {
    pending: boolean;
    user: User | null;
};

const initialUserState = {
    pending: true,
    user: null,
};

const UserContext = React.createContext<UserState>(initialUserState);

export const UserAuthProvider: React.FC = ({ children }) => {
    const [userState, setUserState] =
        React.useState<UserState>(initialUserState);

    React.useEffect(() => {
        return auth.onAuthStateChanged((user) =>
            setUserState({ pending: false, user })
        );
    }, []);

    return (
        <UserContext.Provider value={userState}>
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
