import express from "express";
import { addShow, deleteShow, getAllShowByMovie, getAllShowByTheatre, getShowById, updateShow } from "../controllers/showController.js";


const router = express.Router();


router.post("/addShow", addShow);
router.delete("/deleteShow/:showId", deleteShow);
router.patch("/updateShow/:showId", updateShow);
router.get("/getAllShowsByTheatre/:theatreId", getAllShowByTheatre);
router.get("/getShowById/:showId", getShowById);
router.get("/getAllShowByMovie", getAllShowByMovie)


export default router;