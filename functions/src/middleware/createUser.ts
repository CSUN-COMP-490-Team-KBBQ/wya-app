import { RequestHandler } from 'express';
import * as admin from 'firebase-admin';

const createUser: RequestHandler = async (req, res, next) => {
    const auth: admin.auth.Auth = req.app.locals.auth;
    const functions = req.app.locals.functions;
    const { email, password } = req.body;
    try {
        functions.logger.info('Creating user');
        const { uid } = await auth.createUser({
            email,
            password,
        });
        res.locals.uid = uid;
        next();
    } catch (e) {
        if (e instanceof Error) {
            functions.logger.error(e);
            res.status(500).send(`${e.name}: ${e.message}`);
        }
    }
};

export default createUser;
