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
router.use(authMiddleware);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/", updateTodo);
router.delete("/:id", deleteTodo);


router.patch("/:id/check", checkTodo);
router.patch("/clear-completed", clearCompleted);


export default router;
