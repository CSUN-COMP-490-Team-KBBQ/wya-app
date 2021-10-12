import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const app = admin.initializeApp(functions.config());
const firestore = admin.firestore(app);

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((_request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send('Hello from Firebase!');
});

export default helloWorld; // this is just so eslint doesnt complain. when a file has a single export it prefers default

export const createUserRecord = functions.auth
    .user()
    .onCreate(({ uid, email }) => {
        return firestore.doc(`/users/${uid}`).create({
            uid,
            email,
            firstName: '',
            lastName: '',
            events: [],
        });
    });

export const deleteUserRecord = functions.auth.user().onDelete(({ uid }) => {
    return firestore.doc(`/users/${uid}`).delete();
});
