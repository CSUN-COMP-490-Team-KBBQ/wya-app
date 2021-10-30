import { RequestHandler } from 'express';

const createUserRecord: RequestHandler = async (req, res, next) => {
    const functions = req.app.locals.functions;
    const firestore: FirebaseFirestore.Firestore = req.app.locals.firestore;
    const { firstName, lastName, email } = req.body;
    const uid = res.locals.uid;
    functions.logger.info('Creating user record');
    try {
        await firestore.doc(`/users/${uid}`).create({
            uid,
            email,
            firstName,
            lastName,
            events: [],
            availability: {},
        });
        functions.logger.info(`User ${uid} successfully created.`);
        next();
    } catch (e) {
        if (e instanceof Error) {
            functions.logger.error(e);
            res.status(500).send(`${e.name}: ${e.message}`);
        }
    }
};

export default createUserRecord;
