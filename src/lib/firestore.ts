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
import { UserDataAvailability } from '../interfaces/User';
import { LABELS } from './AvailabilityHeatMap';

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
    const AvailabilityHeatMap = {};

    // creating days map
    let i = 0;
    while (tempDateTimeStamp < endDateTimeStamp) {
        const tempDays = {
            [tempDateTimeStamp.valueOf().toString()]: [],
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
        const tempAvailabilityHeatMap = {
            [tempTimeTimeStamp.toTimeString().slice(0, 5)]: days,
        };
        Object.assign(AvailabilityHeatMap, tempAvailabilityHeatMap);
        tempTimeTimeStamp = new Date(
            startTimeTimeStamp.getTime() + i * TIMEINCREMENT.getTime()
        );
        i += 1;
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
    data: number[][],
    uid: string
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const userDocRef = getDocRef(`/users/${uid}`);
        const availabilityData: UserDataAvailability = {};

        for (let j = 0; j < LABELS.yLabels.length; j += 1) {
            const dateData = [];
            for (let i = 0; i < LABELS.xLabels.length; i += 1) {
                dateData.push(data[j][i]);
            }
            availabilityData[LABELS.yLabels[j]] = dateData;
        }

        updateDoc(userDocRef, 'availability', {
            ...availabilityData,
        })
            .then(() => {
                resolve(uid);
            })
            .catch(reject);
    });
};

export default firestore;
