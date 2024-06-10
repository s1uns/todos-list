import { Router } from "express";
import { login, logout, register } from "../../controllers/auth/index.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", authMiddleware, logout);

export default router;
