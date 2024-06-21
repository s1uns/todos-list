import { Router } from "express";
import { manageShared } from "../../controllers/shared/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/:id", manageShared);

export default router;
