import * as express from 'express';
import * as cors from 'cors';
import { json as bodyParserJSON } from 'body-parser';
import registerRouter from './routes/register';

const app = express();
app.use(cors());
app.use(bodyParserJSON());
app.use('/register', registerRouter);

export default app;
