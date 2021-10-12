import { doc, setDoc, getFirestore } from 'firebase/firestore';
import app from './firebase';

const firestore = getFirestore(app);

// createEvent makes use setDoc which will use the hostId and eventId from the front-end
const createEvent = async (eventData: any): Promise<void> => {
    const data = {
        availabilities: {},
        description: eventData.description,
        endDate: new Date(eventData.endDatetime),
        guests: eventData.guests,
        hostId: eventData.hostId,
        startDate: new Date(eventData.startDatetime),
        title: eventData.name,
    };

    const id = eventData.eventId;
    const eventsDocumentRef = doc(firestore, 'events', id);
    await setDoc(eventsDocumentRef, data);
};

export default { createEvent };
