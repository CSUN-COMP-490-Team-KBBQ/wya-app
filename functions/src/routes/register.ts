import { Router } from 'express';
import createUser from '../middleware/createUser';

const router = Router();

router.post('/', createUser, async (req, res) => {
    const functions = req.app.locals.functions;
    const firestore = req.app.locals.firestore;

    const { email, firstName, lastName } = req.body;
    try {
        const user = res.locals.user;
        const { uid } = user;
        functions.logger.info('Creating user record');
        await firestore.doc(`/users/${uid}`).create({
            uid,
            email,
            firstName,
            lastName,
            events: [],
            availability: {},
        });
        functions.logger.info(`User ${uid} successfully created.`);
        res.status(200).send(user.toJSON());
    } catch (e) {
        if (e instanceof Error) {
            functions.logger.error(e);
            res.status(500).send(`${e.name}: ${e.message}`);
        }
    }
});

export default router;
