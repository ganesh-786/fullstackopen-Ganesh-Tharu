const express = require("express");
const app = express();

const { connectToDatabase } = require("./utils/db");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { tokenExtractor } = require("./utils/middleware");

const { PORT } = require("./utils/config");

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const wrapAsyncRouter = (router) => {
  const methods = ["get", "post", "put", "delete", "patch", "use"];
  methods.forEach((method) => {
    const original = router[method];
    router[method] = function (...args) {
      const wrapped = args.map((arg) => {
        if (typeof arg === "function") {
          return asyncHandler(arg);
        }
        return arg;
      });
      return original.apply(this, wrapped);
    };
  });
  return router;
};

app.use(express.json());
app.use(tokenExtractor);
app.use("/api/blogs", wrapAsyncRouter(blogsRouter));
app.use("/api/users", wrapAsyncRouter(userRouter));
app.use("/api/login", wrapAsyncRouter(loginRouter));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    const errors = error.errors.map((e) => e.message);
    return response.status(400).json({ error: errors });
  }

  if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: error.message });
  }

  response.status(500).json({ error: error.message });
};

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(
      `Server running on port \n http://localhost:${PORT}/api/blogs \n http://localhost:${PORT}/api/users `
    );
  });
};

start();
