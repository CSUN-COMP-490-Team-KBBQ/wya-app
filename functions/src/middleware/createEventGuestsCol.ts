import { RequestHandler } from 'express';

const createEventGuestsCol: RequestHandler = async (req, res, next) => {
    const functions = req.app.locals.functions;
    const firestore: FirebaseFirestore.Firestore = req.app.locals.firestore;
    const { eventId, guests } = req.body;
    try {
        functions.logger.info('Creating event guest subcollection');
        const batch = firestore.batch();
        Object.keys(guests).forEach((guest) => {
            if (guest) {
                batch.create(
                    firestore.doc(`/events/${eventId}/guests/${guest}`),
                    {
                        email: guest,
                        status: 'PENDING',
                    }
                );
            }
        });
        await batch.commit();
        next();
    } catch (e) {
        functions.logger.error(e);
        res.status(500).json({
            name: 'ERROR/FIRESTORE',
            message: 'Error creating event guest subcollection',
        });
    }
};

export default createEventGuestsCol;
