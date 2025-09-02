import express from "express";
import { getUnique, getUser } from "../controllers/controller.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getUnique);

export default router;
