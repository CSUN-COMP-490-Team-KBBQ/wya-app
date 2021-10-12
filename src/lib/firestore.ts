import {
    doc,
    setDoc,
    getFirestore,
    getDoc,
    DocumentData,
    DocumentReference,
} from 'firebase/firestore';
import app from './firebase';
import EventData from '../interfaces/Event';

const firestore = getFirestore(app);

const getDocRef = (path: string): DocumentReference<DocumentData> => {
    return doc(firestore, path);
};

export const createEvent = (data: EventData): Promise<void> => {
    const eventDocRef = getDocRef(`/events/${data.eventId}`);
    return setDoc(eventDocRef, {
        ...data,
    });
};

export const getEventData = async (eventId: string): Promise<EventData> => {
    const eventDocRef = getDocRef(`/events/${eventId}`);
    return (await getDoc(eventDocRef)).data() as EventData;
};

export default firestore;
