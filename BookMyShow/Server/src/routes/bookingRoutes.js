import express from "express";
import {
  makePayment,
  bookShow,
  getAllBookings,
} from "../controllers/BookingController.js";

const router = express.Router();

router.post("/makePayment", makePayment);
router.post("/bookShow", bookShow);
router.get("/getAllBookings", getAllBookings);

export default router;