import { Router } from "express";
import {
    createTodo,
    getTodos,
    deleteTodo,
} from "../../controllers/todo/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
