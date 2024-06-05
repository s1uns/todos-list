const { Router } = require("express");
const router = Router();
const authController = require("../../controllers/authController/authController");

router.post("/login", authController.login());
router.post("/register", authController.register());
