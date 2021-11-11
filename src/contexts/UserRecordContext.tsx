import React from 'react';
import UserData from '../interfaces/User';
import { getDocSnapshot$ } from '../lib/firestore';
import { useUserContext } from './UserContext';

const UserRecordContext = React.createContext<UserData | null>(null);

export const UserRecordProvider: React.FC = ({ children }) => {
    const [userRecord, setUserRecord] = React.useState<UserData | null>(null);

    const user = useUserContext();

    React.useEffect(() => {
        return getDocSnapshot$(`/users/${user?.uid}`, {
            next: (snapshot) => {
                if (snapshot.exists()) {
                    setUserRecord(snapshot.data() as UserData);
                }
            },
        });
    }, [user]);

    return (
        <UserRecordContext.Provider value={userRecord}>
            {children}
        </UserRecordContext.Provider>
    );
};

export const useUserRecordContext = (): UserData | null => {
    const userRecord = React.useContext(UserRecordContext);
    if (userRecord === undefined) {
        throw new Error(
            'useUserRecordContext hook must be used within an UserRecordProvider'
        );
    }
    return userRecord;
};
