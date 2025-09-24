import express from "express";
import {
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} from "../controller/controller.js";
import { userExtractor } from "../utils/middleware.js";

const router = express.Router();

router.get("/", getBlog);
router.post("/", userExtractor, createBlog);
router.delete("/:id", userExtractor, deleteBlog);
router.put("/:id", updateBlog);

export default router;
