import express from "express";
import { Database } from "./config/db.js";
import dotenv from "dotenv";
import route from "./routes/route.js";
import cors from "cors";
import morgan from "morgan";
import { deleteUser, getInfo, updateUser } from "./controllers/controller.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/persons", route);
app.get("/info", getInfo);
app.delete("/api/persons/:_id", deleteUser);
app.put("/api/persons/:_id", updateUser);

Database().then(() => {
  app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`);
  });
});
