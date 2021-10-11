import {
    collection,
    doc,
    getDocs,
    setDoc,
    addDoc,
} from 'firebase/firestore/lite';
import { firestore } from './firebase';

const eventsCollectionRef = collection(firestore, 'events');

// addDoc will automatically assign a unique document ID
const addEvent = async (eventData: any) => {
    await addDoc(eventsCollectionRef, eventData);
};

// setDoc will use the referenced document ID, if the document ID does not exist, it will create it.
const setEvent = async (eventData: any, eventRef: string) => {
    const eventsDocumentRef = doc(firestore, 'events', eventRef);
    await setDoc(eventsDocumentRef, eventData);
};

const getEvents = async (): Promise<void> => {
    const snapshot = await getDocs(eventsCollectionRef);

    snapshot.forEach((docu) => {
        console.log(docu.id, '=>', docu.data());
    });
};

export default { addEvent, setEvent, getEvents };
