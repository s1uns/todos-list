import { Router } from "express";
import {
	checkEmailAvailability,
	login,
	logout,
	register,
} from "../../controllers/auth/index.js";
import { validateBody } from "../../middleware/validationMiddleware.js";
import userLoginSchema from "../../utils/validators/auth/UserLoginSchema.js";
import userRegistrationSchema from "../../utils/validators/auth/UserRegistrationSchema.js";

const router = Router();

router.post("/available-email", checkEmailAvailability);
router.post("/login", validateBody(userLoginSchema), login);
router.post("/registration", validateBody(userRegistrationSchema), register);
router.post("/logout", logout);

export default router;
