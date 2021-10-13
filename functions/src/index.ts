import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { json as bodyParserJSON } from 'body-parser';

const firebase = admin.initializeApp(functions.config());
const firestore = admin.firestore(firebase);
const auth = admin.auth(firebase);

// Using express and exposing functions as express widget
// https://firebase.google.com/docs/functions/http-events#using_existing_express_apps
const app = express();
app.use(cors());
app.use(bodyParserJSON());
app.post('/register', async (req, res) => {
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
            events: {},
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
export const api = functions.https.onRequest(app);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const deleteUserRecord = functions.auth.user().onDelete(({ uid }) => {
    return firestore
        .doc(`/users/${uid}`)
        .delete()
        .then(() => {
            functions.logger.info(`User ${uid} successfully deleted.`);
        });
});
