import React from 'react';
import UserData from '../interfaces/User';
import { getDocSnapshot$ } from '../lib/firestore';
import { useUserContext } from './UserContext';

type UserRecordState = {
    pending: boolean;
    userRecord: UserData | null;
};

const initialUserRecordState = {
    pending: true,
    userRecord: null,
};

const UserRecordContext = React.createContext<UserRecordState>(
    initialUserRecordState
);

export const UserRecordProvider: React.FC = ({ children }) => {
    const [userRecordState, setUserRecordState] =
        React.useState<UserRecordState>(initialUserRecordState);

    const { pending, user } = useUserContext();

    React.useEffect(() => {
        if (!pending && user) {
            return getDocSnapshot$(`/users/${user.uid}`, {
                next: (snapshot) => {
                    if (snapshot.exists()) {
                        setUserRecordState({
                            pending: false,
                            userRecord: snapshot.data() as UserData,
                        });
                    }
                },
            });
        }
        return setUserRecordState({ pending, userRecord: null });
    }, [user]);

    return (
        <UserRecordContext.Provider value={userRecordState}>
            {children}
        </UserRecordContext.Provider>
    );
};

export const useUserRecordContext = (): UserRecordState => {
    const userRecord = React.useContext(UserRecordContext);
    if (userRecord === undefined) {
        throw new Error(
            'useUserRecordContext hook must be used within an UserRecordProvider'
        );
    }
    return userRecord;
};
