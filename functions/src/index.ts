import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((_request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true });
    response.send('Hello from Firebase!');
});

export default helloWorld; // this is just so eslint doesnt complain. when a file has a single export it prefers default
