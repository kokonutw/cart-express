import express from "express";
import { signInWithEmail, signUpNewEmail } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUpNewEmail);
router.post("/signin", signInWithEmail);

export default router;
