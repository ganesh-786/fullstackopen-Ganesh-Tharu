import express from "express";
import dotenv from "dotenv";
import router from "./routes/route.js";
import { getInfo } from "./controllers/controller.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use("/api/persons", router);
app.use("/info", getInfo);

app.listen(PORT, () => {
  console.log(`app running at http://localhost:${PORT}`);
});
