if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import express, { Express } from 'express';
import cors from 'cors';
import startDB from './configs/db.config';
import userRouter from './routes/user.routes';
import path from 'path';

startDB();

const app: Express = express();

app.use(express.json()); //parse json requests first
app.use(express.urlencoded({ extended: true })); //parse url encoded requests

app.use(cors()); //enable cors after parsing request

//on accessig the root directory via the browser
app.get('/', (req, res) => {
  //Set the Content-Type header to indicate that HTML content is being sent
  res.setHeader('Content-Type', 'text/javascript');
  // Send an HTML page with styled content
  res.sendFile(path.join(__dirname, 'welcome.js'));
});

// Use user routes
app.use('/api/v1/', userRouter);

const PORT: number = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
