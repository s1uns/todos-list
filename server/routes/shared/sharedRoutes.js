import { Router } from "express";
import {
    shareTodos,
    getAvailableUsers,
} from "../../controllers/shared/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/:id", shareTodos);
router.get("/available-users", getAvailableUsers);

export default router;
