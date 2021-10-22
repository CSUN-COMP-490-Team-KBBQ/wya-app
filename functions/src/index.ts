import * as nodemailer from 'nodemailer';
import { QueryDocumentSnapshot } from 'firebase-functions/v1/firestore';
import { firestore, functions } from './firebase';
import app from './app';

// Using express and exposing functions as express widget
// https://firebase.google.com/docs/functions/http-events#using_existing_express_apps
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

export const emailEventToGuests = functions.firestore
    .document('events/{eventId}')
    .onCreate((event: QueryDocumentSnapshot) => {
        const { eventId, name, guests } = event.data();
        // NOTE: Using localhost because there is currently no domain registered for the website
        const eventUrl = `http://localhost:3000/event/${eventId}`;

        const { user, pass } = functions.config().hostemail;
        const transporter = nodemailer.createTransport({
            // NOTE: Using gmail as a sender because there is currently no domain for an email service
            service: 'gmail',
            auth: {
                user,
                pass,
            },
        });

        Object.keys(guests).forEach((email) => {
            functions.logger.info(`sending event invitation email to ${email}`);
            const mailOptions = {
                from: user,
                to: email,
                subject: 'You have been invited to join an event!',
                html: `
                    <h1>WYA</h1>
                    <p>The following event is waiting for you to join: ${name}.</p>
                    <p>Click here to view event: <a href="${eventUrl}">${eventUrl}</a></p>`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err)
                    functions.logger.error(
                        `Issue with sending email. Error: ${err}`
                    );
                else {
                    functions.logger.info(
                        `Event invitation email sent to ${email} `
                    );
                    functions.logger.info(`Response: ${info.response} `);
                }
            });
        });
    });
