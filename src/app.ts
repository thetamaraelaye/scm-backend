if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();    
}

import express, { Express } from "express"
import cors from "cors"
import { startDB } from "./config/db.config";

startDB();

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())

app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )