import Stripe from "stripe";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Show from "../models/Show.js";
import dotenv from "dotenv";
import { model } from "mongoose";
import emailHelper from "../utils/emailHelper.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const makePayment = async (req, res) => {
  // making a payment (interacting with stripe, return back transaction id)
  try {
    const { amount, description, name } = req.body;
    const { _id, email } = req.user;

    if (!amount) {
      return res.status(500).send({
        success: false,
        message: "Amount is required (in smallest currency unit, e.g: rupees)",
      });
    }

    const bookMyShowAddress = {
      line1: "BookMyShow Office, 1st Floor, Cinema Plaza",
      line2: "Near Central Mall",
      city: "Mumbai",
      state: "Maharashtra",
      postal_code: "400001",
      country: "IN",
    };

    let stripeCustomer = null;

    const exisitingCustomer = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (exisitingCustomer.data.length > 0) {
      stripeCustomer = exisitingCustomer.data[0];
    } else {
      stripeCustomer = await stripe.customers.create({
        name: name,
        email: email,
        address: bookMyShowAddress,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      description,
      customer: stripeCustomer.id,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: email,
      shipping: {
        name: name,
        address: bookMyShowAddress,
      },
    });

    return res.send({
      success: true,
      message: "PaymentIntent created successfully",
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message || "Stripe error",
    });
  }
};
export const bookShow = async (req, res) => {
  try {
    const { show, seats } = req.body;
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const showNeedToUpdated = await Show.findById(show);

    const updatedBookedSeats = [...showNeedToUpdated.bookedSeats, ...seats];

    await Show.findByIdAndUpdate(show, {
      bookedSeats: updatedBookedSeats,
    });

    const populatedBooking = await Booking.findById(newBooking._id)
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatre",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      });

    const metaData = {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.title,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    };

    await emailHelper("ticketTemplate.html", populatedBooking.user.email, metaData);
    res.send({
      success: true,
      message: "payment successfull",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Get Movie By Id Failed with error :  ${error}`,
    });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookings = await Booking.find({ user: userId })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatre",
        },
      });
    res.send({
      success: true,
      message: "Bookings fetched",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Get Movie By Id Failed with error :  ${error}`,
    });
  }
};
