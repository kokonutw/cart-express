import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getUserBySupabaseid } from "../controllers/userController.js";
const router = express.Router();

router.get("/:id_auth_supabase", authenticate, getUserBySupabaseid);

export default router;
