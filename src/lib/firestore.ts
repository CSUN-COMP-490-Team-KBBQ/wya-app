import moment from 'moment';
import {
    doc,
    getFirestore,
    getDoc,
    DocumentData,
    DocumentReference,
    onSnapshot,
    DocumentSnapshot,
    FirestoreError,
    Unsubscribe,
    updateDoc,
} from 'firebase/firestore';
import axios from 'axios';
import app from './firebase';
import EventData, { EventDataAvailability } from '../interfaces/EventData';
import UserData from '../interfaces/User';

const firestore = getFirestore(app);

const getDocRef = (path: string): DocumentReference<DocumentData> => {
    return doc(firestore, path);
};

const formatAvailability = (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
): EventDataAvailability => {
    const endDateTimeStamp = moment(endDate);
    const endTimeTimeStamp = moment(endTime, 'HH:mm');
    const tempDateTimeStamp = moment(startDate);
    const tempTimeTimeStamp = moment(startTime, 'HH:mm');
    const days = {};
    const AvailabilityHeatMap = {};

    // creating days map
    while (tempDateTimeStamp.isSameOrBefore(endDateTimeStamp)) {
        const tempDays = {
            [tempDateTimeStamp.valueOf()]: [],
        };
        Object.assign(days, tempDays);
        tempDateTimeStamp.add(1, 'days');
    }

    // creating availability map
    while (tempTimeTimeStamp.isSameOrBefore(endTimeTimeStamp)) {
        const tempAvailabilityHeatMap = {
            [tempTimeTimeStamp.format('HH:mm')]: days,
        };
        Object.assign(AvailabilityHeatMap, tempAvailabilityHeatMap);
        tempTimeTimeStamp.add(15, 'minutes');
    }

    return AvailabilityHeatMap;
};

export const createEvent = (data: EventData): Promise<string> => {
    return new Promise((resolve, reject) => {
        const availability = formatAvailability(
            data.startDate,
            data.endDate,
            data.startTime,
            data.endTime
        );
        // rather than handling this on the client side we will POST the form data to the cloud function api
        axios
            .post(
                'https://us-central1-kbbq-wya-35414.cloudfunctions.net/api/create-event',
                JSON.stringify({ ...data, availability }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {
                // eslint-disable-next-line
                console.log(res.data);
                resolve(data.eventId);
            })
            .catch(reject);
    });
};

export const getEventData = async (eventId: string): Promise<EventData> => {
    const eventDocRef = getDocRef(`/events/${eventId}`);
    return (await getDoc(eventDocRef)).data() as EventData;
};

export const updateEvent = async (event: EventData): Promise<void> => {
    const eventDocRef = getDocRef(`/events/${event.eventId}`);
    return updateDoc(eventDocRef, { ...event });
};

export const updateUserRecord = async (user: UserData): Promise<void> => {
    const userDocRef = getDocRef(`/users/${user.uid}`);
    return updateDoc(userDocRef, { ...user });
};

export const getDocSnapshot$ = (
    path: string,
    observer: {
        next?: ((snapshot: DocumentSnapshot<DocumentData>) => void) | undefined;
        error?: ((error: FirestoreError) => void) | undefined;
        complete?: (() => void) | undefined;
    }
): Unsubscribe => {
    const docRef = getDocRef(path);
    return onSnapshot(docRef, observer);
};

export const updateCalendarAvailability = (
    date: Array<number>,
    uid: string
): Promise<string> => {
    // remove new Promise since updateDoc returns a promise
    return new Promise((resolve, reject) => {
        const userDocRef = getDocRef(`/users/${uid}`);

        updateDoc(userDocRef, 'availability', date)
            .then(() => {
                resolve(uid);
            })
            .catch(reject);
    });
};

export const updateUserTimeFormatOption = (
    timeFormatOption: boolean,
    uid: string
): Promise<void> => {
    const userDocRef = getDocRef(`/users/${uid}`);
    return updateDoc(userDocRef, 'timeFormat24Hr', timeFormatOption);
};

export const updateEventAvailability = (
    data: EventDataAvailability,
    eventId: string
): Promise<void> => {
    const eventDocRef = getDocRef(`/events/${eventId}`);
    return updateDoc(eventDocRef, 'availability', data);
};

export default firestore;
