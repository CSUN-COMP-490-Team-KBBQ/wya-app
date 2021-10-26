import { Router } from 'express';
import { functions, firestore } from '../firebase';

const router = Router();

router.post('/', async (req, res) => {
    const { eventId, guests, name, description, startDate, hostId } = req.body;
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

        functions.logger.info('Inviting guests');
        await Promise.all(
            Object.keys(guests).map((guest) => {
                const queryRef = firestore
                    .collection('/users')
                    .where('email', '==', guest);
                return firestore.runTransaction(async (transaction) => {
                    const querySnapshot = await transaction.get(queryRef);
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach(async (doc) => {
                            await transaction.update(doc.ref, {
                                events: {
                                    ...doc.data().events,
                                    [eventId]: {
                                        eventId,
                                        name,
                                        description,
                                        startDate,
                                        role: 'GUEST',
                                    },
                                },
                            });
                        });
                    }
                });
            })
        );

        res.status(200).json(req.body);
    } catch (e) {
        if (e instanceof Error) {
            functions.logger.error(e);
            res.status(500).send(`${e.name}: ${e.message}`);
        }
    }
});

export default router;
