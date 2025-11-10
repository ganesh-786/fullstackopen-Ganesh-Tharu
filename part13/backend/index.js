const express = require("express");
const app = express();

const { connectToDatabase } = require("./utils/db");
const blogsRouter = require("./controllers/blogs");
const { PORT } = require("./utils/config");

// Wrapper to handle async errors in Express 5 (replacement for express-async-errors)
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Monkey-patch router methods to auto-wrap async handlers (Express 5 compatible)
const wrapAsyncRouter = (router) => {
  const methods = ['get', 'post', 'put', 'delete', 'patch', 'use'];
  methods.forEach(method => {
    const original = router[method];
    router[method] = function(...args) {
      const wrapped = args.map(arg => {
        // Wrap all functions (both async and sync) to handle async errors
        if (typeof arg === 'function') {
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
app.use("/api/blogs", wrapAsyncRouter(blogsRouter));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message });
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
    console.log(`Server running on port http://localhost:${PORT}/api/blogs`);
  });
};

start();
