import { Router } from "express";
import { shareTodos } from "../../controllers/shared/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/:id", shareTodos);

export default router;
