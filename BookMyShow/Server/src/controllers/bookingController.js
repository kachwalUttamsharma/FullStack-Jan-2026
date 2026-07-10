import Stripe from "stripe";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Show from "../models/Show.js";
import dotenv from "dotenv";
dotenv.config();


const stripe = new Stripe(process.env.STRIPE_KEY);

export const makePayment = async () => {

    try {

    } catch(error) {
      return res.status(500).send({
      success: false,
      message: error.message || "Stripe error",
    }); 
    }
};
export const bookShow = async () => {};
export const getAllBookings = async () => {};