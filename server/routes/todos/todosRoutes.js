import { Router } from "express";
import {
    createTodo,
    getTodos,
    deleteTodo,
    updateTodo,
    checkTodo,
    clearCompleted,
} from "../../controllers/todo/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/create", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.get("/check/:id", authMiddleware, checkTodo);
router.get("/clear-completed", authMiddleware, clearCompleted);
router.delete("/:id", authMiddleware, deleteTodo);
router.put("/update", authMiddleware, updateTodo);

export default router;
