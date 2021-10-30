import { Router } from 'express';
import { firestore, auth, functions } from '../firebase';

const router = Router();

router.post('/', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        functions.logger.info('Creating user');
        const user = await auth.createUser({
            email,
            password,
        });
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
