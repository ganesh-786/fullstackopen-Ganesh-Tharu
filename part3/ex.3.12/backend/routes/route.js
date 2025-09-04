import express from "express";
import { createUser, getUser } from "../controllers/controller.js";
const route = express.Router();

route.get("/", getUser);
route.post("/", createUser);

export default route;
