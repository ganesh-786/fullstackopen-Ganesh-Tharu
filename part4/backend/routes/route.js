import express from "express";
import { createBlog, getBlog } from "../controller/controller.js";

const router = express.Router();

router.get("/", getBlog);
router.post("/", createBlog);

export default router;
