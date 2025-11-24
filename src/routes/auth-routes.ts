import { Router } from "express";
import { register, login, getMe, adminRegister } from "../controllers/auth-controleer";

const router = Router();

// Define routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", getMe);
router.post("/admin/register", adminRegister);

export default router;