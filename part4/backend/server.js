import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/route.js";
import usersRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import { tokenExtractor } from "./utils/middleware.js";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", router);
app.use("/api/users", usersRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`app running at http://localhost:${PORT}`);
  });
});

export default app;
