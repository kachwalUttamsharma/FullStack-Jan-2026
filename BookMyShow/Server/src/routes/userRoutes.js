import express from "express";
import {currentUser, forgetPassword, login, register, resetPassword} from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getCurrentUser", authMiddleware, currentUser);
router.post("/forgetPassword", forgetPassword);
router.post("/resetPassword", resetPassword)

export default router;