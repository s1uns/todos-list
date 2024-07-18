import { Router } from "express";
import {
	getAvailableUsers,
	getTodosSharers,
} from "../../controllers/user/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/available-users", getAvailableUsers);
router.get("/todos-sharers", getTodosSharers);

export default router;
