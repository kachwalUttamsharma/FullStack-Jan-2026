import express from "express";
import {currentUser, login, register} from "../controllers/userController.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getCurrentUser/:id", currentUser);

export default router;