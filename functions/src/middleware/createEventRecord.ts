import { RequestHandler } from 'express';

const createEventRecord: RequestHandler = async (req, res, next) => {
    const functions = req.app.locals.functions;
    const firestore: FirebaseFirestore.Firestore = req.app.locals.firestore;
    const { eventId } = req.body;
    try {
        functions.logger.info('Creating event document');
        const eventDocRef = firestore.doc(`/events/${eventId}`);
        await eventDocRef.create(req.body);
        next();
    } catch (e) {
        functions.logger.error(e);
        res.status(500).json({
            name: 'ERROR/FIRESTORE',
            message: 'Error creating event record',
        });
    }
};

export default createEventRecord;
