import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
 {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatre",
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    bookedSeats: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }    
)

// -> show will run a movie -> which movie
// -> show will in a theatre -> which theatre

const Show = mongoose.model("shows", showSchema);
export default Show;