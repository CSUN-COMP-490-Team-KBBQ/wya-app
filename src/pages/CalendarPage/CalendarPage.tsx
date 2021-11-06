import React from 'react';
import './CalendarPage.css';
import EventList from '../../components/EventList/EventList';
import UserData from '../../interfaces/User';
import { useUserContext } from '../../contexts/UserContext';
import { getDocSnapshot$ } from '../../lib/firestore';

export default function CalendarPage(): JSX.Element {
    const user = useUserContext();
    const [userData, setUserData] = React.useState<UserData>();

    React.useEffect(() => {
        if (user) {
            return getDocSnapshot$(`/users/${user.uid}`, {
                next: (snapshot) => {
                    setUserData(snapshot.data() as UserData);
                },
            });
        }

        return undefined;
    }, [user]);

    return userData !== undefined ? (
        <div>
            <h1>CalendarPage</h1>
            <EventList
                elementId="calendar-event-list"
                events={userData.events}
            />
        </div>
    ) : (
        <div>
            {/* TODO: Add loading page */}
            <h1>CalendarPage</h1>
        </div>
    );
}
