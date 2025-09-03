import express from "express";
import dotenv from "dotenv";
import router from "./routes/route.js";
import morgan from "morgan";
import cors from "cors";
import {
  createUser,
  deleteUser,
  getInfo,
  updateUser,
} from "./controllers/controller.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.post("/api/persons", createUser);
app.delete("/api/persons/:id", deleteUser);
app.put("/api/persons/:id", updateUser);
app.use("/api/persons", router);
app.use("/info", getInfo);

app.listen(PORT, () => {
  console.log(`app running at http://localhost:${PORT}`);
});
