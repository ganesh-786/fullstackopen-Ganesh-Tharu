import express from "express";
import { createUser, getUsers } from "../controller/controller.js";

const usersRouter = express.Router();

usersRouter.post("/", createUser);
usersRouter.get("/", getUsers);

export default usersRouter;
