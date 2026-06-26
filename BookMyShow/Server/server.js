import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

// loading your secrets into server
dotenv.config();
connectDB();

const app = express();

const PORT = process?.env?.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Book My Show Server")
})

app.listen(PORT, () => {
    console.log(`Welcome to BookMyShow server running on Port ${PORT}`)
})