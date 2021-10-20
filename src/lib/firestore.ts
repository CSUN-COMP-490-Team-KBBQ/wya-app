import {
    doc,
    setDoc,
    updateDoc,
    getFirestore,
    getDoc,
    DocumentData,
    DocumentReference,
    onSnapshot,
    DocumentSnapshot,
    FirestoreError,
    Unsubscribe,
} from 'firebase/firestore';
import app from './firebase';
import EventData, { EventDataAvailability } from '../interfaces/Event';

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
    const ONEDAYTOMILLISEC = 86400000;
    const TIMEINCREMENT = new Date(900000);
    const startDateTimeStamp = new Date(`${startDate}T00:00`);
    const endDateTimeStamp = new Date(`${endDate}T23:59`);
    const startTimeTimeStamp = new Date(`1999-12-31T${startTime}`);
    const endTimeTimeStamp = new Date(`1999-12-31T${endTime}`);
    let tempDateTimeStamp = startDateTimeStamp;
    let tempTimeTimeStamp = startTimeTimeStamp;
    const days = {};
    const availabilityMap = {};

    // creating days map
    let i = 0;
    while (tempDateTimeStamp < endDateTimeStamp) {
        const tempDays = {
            [tempDateTimeStamp.toDateString().slice(0, 15)]: [],
        };
        Object.assign(days, tempDays);
        tempDateTimeStamp = new Date(
            startDateTimeStamp.getTime() + i * ONEDAYTOMILLISEC
        );
        i += 1;
    }

    // creating availability map
    i = 0;
    while (tempTimeTimeStamp <= endTimeTimeStamp) {
        const tempAvailabilityMap = {
            [tempTimeTimeStamp.toTimeString().slice(0, 5)]: days,
        };
        Object.assign(availabilityMap, tempAvailabilityMap);
        tempTimeTimeStamp = new Date(
            startTimeTimeStamp.getTime() + i * TIMEINCREMENT.getTime()
        );
        i += 1;
    }

    return availabilityMap;
};

export const createEvent = (data: EventData): Promise<string> => {
    return new Promise((resolve, reject) => {
        const eventDocRef = getDocRef(`/events/${data.eventId}`);
        const availability = formatAvailability(
            data.startDate,
            data.endDate,
            data.startTime,
            data.endTime
        );
        setDoc(eventDocRef, {
            ...data,
            availability,
        })
            .then(() => {
                resolve(data.eventId);
            })
            .catch(reject);
    });
};

export const getEventData = async (eventId: string): Promise<EventData> => {
    const eventDocRef = getDocRef(`/events/${eventId}`);
    return (await getDoc(eventDocRef)).data() as EventData;
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

export default firestore;
