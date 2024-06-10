import { Router } from "express";
import createTodo from "../../controllers/todo/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authMiddleware, createTodo);

export default router;
