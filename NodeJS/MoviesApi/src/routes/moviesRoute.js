const express = require("express");
const { getAllMovies, getSingleMovie, createMovie, updateMovieByIdPut, updateMovieByIdPatch, deleteMovie } = require("../controller/MovieController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");


router.get("/getAllMovies", getAllMovies);
router.get("/getSingleMovie/:id", getSingleMovie);
router.post("/createMovie", auth, createMovie);
router.put("/updateMovie/:id", auth, updateMovieByIdPut);
router.patch("/updateMovieByPatch/:id", auth, updateMovieByIdPatch);
router.delete("/deleteMovie/:id", auth, deleteMovie);


module.exports = router;