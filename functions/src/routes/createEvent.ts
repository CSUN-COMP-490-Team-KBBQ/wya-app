import { Router } from 'express';
import { functions, firestore } from '../firebase';

const router = Router();

router.post('/', async (req, res) => {
    const { eventId, guests } = req.body;
    try {
        functions.logger.info('Creating event document');
        const eventDocRef = firestore.doc(`/events/${eventId}`);
        await eventDocRef.create(req.body);

        functions.logger.info('Creating guests');
        const batch = firestore.batch();
        Object.keys(guests).forEach((guest) => {
            batch.create(firestore.doc(`/events/${eventId}/guests/${guest}`), {
                email: guest,
            });
        });

        await batch.commit();
        res.status(200).json(req.body);
    } catch (e) {
        if (e instanceof Error) {
            functions.logger.error(e);
            res.status(500).send(`${e.name}: ${e.message}`);
        }
    }
});

export default router;
