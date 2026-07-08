import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import movieRoutes from "./src/routes/movieRoutes.js";
import theatreRoutes from "./src/routes/theatreRoutes.js";
import showRoutes from "./src/routes/showRoutes.js";
import cors from "cors";
import { authMiddleware } from "./src/middleware/authMiddleware.js";

// loading your secrets into server
dotenv.config();
connectDB();

const app = express();

const PORT = process?.env?.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());


// http://localhost:3000/bookmyshow/api/v1/users/register

app.use("/bookmyshow/api/v1/users/", userRoutes);
app.use("/bookmyshow/api/v1/movies/", authMiddleware,movieRoutes);
app.use("/bookmyshow/api/v1/theatres/", authMiddleware, theatreRoutes);
app.use("/bookmyshow/api/v1/shows/", authMiddleware, showRoutes)

app.get("/", (req, res) => {
    res.send("Book My Show Server")
})

app.listen(PORT, () => {
    console.log(`Welcome to BookMyShow server running on Port ${PORT}`)
})