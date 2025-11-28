import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/route.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import testingRouter from "./routes/testing.js";
import { tokenExtractor } from "./utils/middleware.js";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", router);
app.use("/api/users", usersRouter);
app.use("/api/testing", testingRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`);
  });
});

export default app;
