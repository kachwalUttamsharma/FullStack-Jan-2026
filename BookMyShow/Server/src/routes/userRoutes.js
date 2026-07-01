import express from "express";
import {currentUser, login, register} from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getCurrentUser", authMiddleware, currentUser);

export default router;