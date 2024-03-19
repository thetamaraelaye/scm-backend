if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();    
}

import express, { Express } from "express"
import cors from "cors"
import { startDB } from "./config/db.config";

startDB();

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT: number = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
