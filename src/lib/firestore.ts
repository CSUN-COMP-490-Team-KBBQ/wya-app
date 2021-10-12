import {
    collection,
    doc,
    getDocs,
    setDoc,
    addDoc,
    getFirestore,
} from 'firebase/firestore';
import app from './firebase';

const firestore = getFirestore(app);

const eventsCollectionRef = collection(firestore, 'events');

// addDoc will automatically assign a unique document ID
const addEvent = async (eventData: JSON): Promise<void> => {
    await addDoc(eventsCollectionRef, eventData);
};

// setDoc will use the referenced document ID, if the document ID does not exist, it will create it.
const setEvent = async (eventData: JSON, eventRef: string): Promise<void> => {
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
