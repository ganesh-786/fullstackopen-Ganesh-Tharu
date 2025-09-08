import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/route.js";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

app.use("/api/blogs", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`);
  });
});

export default app;
