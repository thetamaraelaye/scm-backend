if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Express } from 'express';
import cors from 'cors';
import startDB from './configs/db.config';
import userRouter from './routes/user.routes';

startDB();

const app: Express = express();

app.use(express.json()); //parse json requests first
app.use(express.urlencoded({ extended: true })); //parse url encoded requests

app.use(cors()); //enable cors after parsing request

// Use user routes
app.use('/api/v1/', userRouter);

const PORT: number = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
