import React from 'react';
import UserData from '../interfaces/User';
import { getDocSnapshot$ } from '../lib/firestore';
import { useUserContext } from './UserContext';

type UserRecordState = {
    pending: boolean;
    userRecord: UserData | null;
};

const UserRecordContext = React.createContext<UserRecordState>({
    pending: true,
    userRecord: null,
});

export const UserRecordProvider: React.FC = ({ children }) => {
    const [userRecord, setUserRecord] = React.useState<UserRecordState>({
        pending: true,
        userRecord: null,
    });

    const { pending, user } = useUserContext();

    React.useEffect(() => {
        if (!pending && user) {
            return getDocSnapshot$(`/users/${user.uid}`, {
                next: (snapshot) => {
                    if (snapshot.exists()) {
                        setUserRecord({
                            pending: false,
                            userRecord: snapshot.data() as UserData,
                        });
                    }
                },
            });
        }
    }, [user]);

    return (
        <UserRecordContext.Provider value={userRecord}>
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
