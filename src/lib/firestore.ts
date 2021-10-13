import {
    doc,
    setDoc,
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
import EventData from '../interfaces/Event';

const firestore = getFirestore(app);

const getDocRef = (path: string): DocumentReference<DocumentData> => {
    return doc(firestore, path);
};

export const createEvent = (data: EventData): Promise<string> => {
    return new Promise((resolve, reject) => {
        const eventDocRef = getDocRef(`/events/${data.eventId}`);
        setDoc(eventDocRef, {
            ...data,
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
