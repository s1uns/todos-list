import { Router } from "express";
import { login, logout, register } from "../../controllers/auth/index.js";

const router = Router();

router.post("/login", login);
router.post("/registration", register);
router.post("/logout", logout);

export default router;
