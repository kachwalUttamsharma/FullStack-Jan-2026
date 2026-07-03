import express from "express";
import { getAllMovies, addMovie, updateMovie, deleteMovie, getMovieById } from "../controllers/movieController.js";

const router = express.Router();

router.get("/getAllMovies", getAllMovies);
router.post("/addMovie", addMovie);
router.patch("/updateMovie/:id", updateMovie);
router.delete("/deleteMovie/:id", deleteMovie);
router.get("/getMovieById/:id", getMovieById);


export default router;