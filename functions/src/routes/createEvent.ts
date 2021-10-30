import { Router } from 'express';
import createEventGuestsCol from '../middleware/createEventGuestsCol';
import createEventRecord from '../middleware/createEventRecord';
import updateEventGuestsRecord from '../middleware/updateEventGuestsRecord';

const router = Router();

router.post(
    '/',
    createEventRecord,
    createEventGuestsCol,
    updateEventGuestsRecord,
    (req, res) => {
        res.status(200).json(req.body);
    }
);

export default router;
