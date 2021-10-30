import { RequestHandler } from 'express';
import * as admin from 'firebase-admin';

const createUser: RequestHandler = async function (req, res, next) {
    const auth: admin.auth.Auth = req.app.locals.auth;
    const functions = req.app.locals.functions;
    const { email, password } = req.body;
    try {
        functions.logger.info('Creating user');
        const user = await auth.createUser({
            email,
            password,
        });
        res.locals.user = user;
        next();
    } catch (e) {
        if (e instanceof Error) {
            functions.logger.error(e);
            res.status(500).send(`${e.name}: ${e.message}`);
        }
    }
};

export default createUser;
