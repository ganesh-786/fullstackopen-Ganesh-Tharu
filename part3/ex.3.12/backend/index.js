import express from "express";
import { Database } from "./config/db.js";
import dotenv from "dotenv";
import route from "./routes/route.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use("/api/persons", route);

Database().then(() => {
  app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`);
  });
});
