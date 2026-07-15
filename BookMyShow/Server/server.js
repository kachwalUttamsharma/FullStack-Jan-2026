import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import movieRoutes from "./src/routes/movieRoutes.js";
import theatreRoutes from "./src/routes/theatreRoutes.js";
import showRoutes from "./src/routes/showRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import cors from "cors";
import morgan from "morgan"
import { authMiddleware } from "./src/middleware/authMiddleware.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";


// loading your secrets into server
dotenv.config();
connectDB();

const app = express();

const PORT = process?.env?.PORT || 5000;


// Secures HTPP Headers
app.use(helmet());

// Prevent NoSQL injection
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution
app.use(hpp());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(morgan("dev"))

const limit = rateLimit({
    windowMs: 15*60*1000, // 15 mins
    max: 100, // max req -> 100
    message: {
        success: false,
        message: "Too many requests. please try again later."
    }
})

app.use(express.json({limit: "10kb"}));


// http://localhost:3000/bookmyshow/api/v1/users/register

app.use("/bookmyshow/api/v1/users/", userRoutes);
app.use("/bookmyshow/api/v1/movies/", authMiddleware,movieRoutes);
app.use("/bookmyshow/api/v1/theatres/", authMiddleware, theatreRoutes);
app.use("/bookmyshow/api/v1/shows/", authMiddleware, showRoutes);
app.use("/bookmyshow/api/v1/bookings", authMiddleware, bookingRoutes)

app.get("/", (req, res) => {
    res.send("Book My Show Server")
})

// custom 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Please check the endpoint, Route not found"
    })
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    })
})
app.listen(PORT, () => {
    console.log(`Welcome to BookMyShow server running on Port ${PORT}`)
})