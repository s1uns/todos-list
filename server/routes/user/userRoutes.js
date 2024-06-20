import { Router } from "express";
import { getAvailableUsers } from "../../controllers/user/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/available-users", getAvailableUsers);

export default router;
