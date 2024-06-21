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
import { validateBody } from "../../middleware/validationMiddleware.js";
import todoCreateScheme from "../../utils/validators/todo/TodoCreateSchema.js";
import todoUpdateScheme from "../../utils/validators/todo/TodoUpdateSchema.js";

const router = Router();
router.use(authMiddleware);

router.post("/", validateBody(todoCreateScheme), createTodo);
router.get("/", getTodos);
router.put("/", validateBody(todoUpdateScheme), updateTodo);
router.delete("/:id", deleteTodo);

router.patch("/:id/check", checkTodo);
router.patch("/clear-completed", clearCompleted);

export default router;
