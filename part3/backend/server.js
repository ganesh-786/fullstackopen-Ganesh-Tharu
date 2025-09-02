import express from "express";
import dotenv from "dotenv";
import router from "./routes/route.js";
import { createUser, deleteUser, getInfo } from "./controllers/controller.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.post("/api/persons", createUser);
app.delete("/api/persons/:id", deleteUser);
app.use("/api/persons", router);
app.use("/info", getInfo);

app.listen(PORT, () => {
  console.log(`app running at http://localhost:${PORT}`);
});
