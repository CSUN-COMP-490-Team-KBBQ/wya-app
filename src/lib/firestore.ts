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
} from 'firebase/firestore';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import app from './firebase';
import {
    EventData,
    EventDataAvailability,
    Participants,
} from '../interfaces/Event';

const firestore = getFirestore(app);

const getDocRef = (path: string): DocumentReference<DocumentData> => {
    return doc(firestore, path);
};

const parseDaysAndTimes = (
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
): {
    days: string[];
    times: string[];
} => {
    const ONEDAYTOMILLISEC = 86400000;
    const TIMEINCREMENT = new Date(900000);
    const startDateTimeStamp = new Date(`${startDate}T00:00`);
    const endDateTimeStamp = new Date(`${endDate}T23:59`);
    const startTimeTimeStamp = new Date(`1999-12-31T${startTime}`);
    const endTimeTimeStamp = new Date(`1999-12-31T${endTime}`);
    let tempDateTimeStamp = startDateTimeStamp;
    let tempTimeTimeStamp = startTimeTimeStamp;
    const days = [];
    const times = [];

    // creating days array
    let i = 1;
    while (tempDateTimeStamp < endDateTimeStamp) {
        days.push(tempDateTimeStamp.toDateString().slice(0, 15));
        tempDateTimeStamp = new Date(
            startDateTimeStamp.getTime() + i * ONEDAYTOMILLISEC
        );
        i += 1;
    }

    // creating times array
    i = 1;
    while (tempTimeTimeStamp <= endTimeTimeStamp) {
        times.push(tempTimeTimeStamp.toTimeString().slice(0, 5));
        tempTimeTimeStamp = new Date(
            startTimeTimeStamp.getTime() + i * TIMEINCREMENT.getTime()
        );
        i += 1;
    }

    return { days, times };
};

export const createEvent = (data: EventData): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { days, times } = parseDaysAndTimes(
            data.startDate,
            data.endDate,
            data.startTime,
            data.endTime
        );

        const participants: Participants = {};
        const availability: EventDataAvailability = [];

        for (let x = 0; x < days.length; x++) {
            for (let y = 0; y < times.length; y++) {
                // lazy initialization for nested array
                if (!availability[x]) availability[x] = [];
                const cellId = uuid();
                availability[x][y] = cellId;
                participants[cellId] = [];
            }
        }

        // rather than handling this on the client side we will POST the form data to the cloud function api
        axios
            .post(
                'https://us-central1-kbbq-wya-35414.cloudfunctions.net/api/create-event',
                JSON.stringify({
                    ...data,
                    availability,
                    participants,
                    days,
                    times,
                }),
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
