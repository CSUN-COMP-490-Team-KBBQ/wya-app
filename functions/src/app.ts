import * as express from 'express';
import * as cors from 'cors';
import { json as bodyParserJSON } from 'body-parser';
import registerRouter from './routes/register';
import createEventRouter from './routes/createEvent';

const app = express();
app.use(cors());
app.use(bodyParserJSON());
app.use('/register', registerRouter);
app.use('/create-event', createEventRouter);

export default app;
