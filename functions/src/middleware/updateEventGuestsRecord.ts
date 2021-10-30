import { RequestHandler } from 'express';

const updateEventGuestsRecord: RequestHandler = async (req, res, next) => {
    const functions = req.app.locals.functions;
    const firestore: FirebaseFirestore.Firestore = req.app.locals.firestore;
    const { guests, eventId, name, description, startDate, startTime } =
        req.body;
    try {
        functions.logger.info('Updating event guests user records');
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
                                events: FirebaseFirestore.FieldValue.arrayUnion(
                                    {
                                        eventId,
                                        name,
                                        description,
                                        startDate,
                                        startTime,
                                        role: 'GUEST',
                                    }
                                ),
                            });
                        });
                    }
                });
            })
        );
        next();
    } catch (e) {
        functions.logger.error(e);
        res.status(500).json({
            name: 'ERROR/FIRESTORE',
            message: 'Error updating event guests user records',
        });
    }
};

export default updateEventGuestsRecord;
