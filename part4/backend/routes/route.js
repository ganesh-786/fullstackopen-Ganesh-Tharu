import express from "express";
import {
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} from "../controller/controller.js";

const router = express.Router();

router.get("/", getBlog);
router.post("/", createBlog);
router.delete("/:id", deleteBlog);
router.put("/:id", updateBlog);

export default router;
