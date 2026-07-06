import express from "express";
import { getTheatres, addTheatre, updateTheatre, deleteTheatre } from "../controllers/theatreController.js";

const router = express.Router();

router.get("/getAllTheatres", getTheatres);
router.post("/addTheatre", addTheatre);
router.patch("/updateTheatre/:id", updateTheatre);
router.delete("/deleteTheatre/:id", deleteTheatre);


export default router;