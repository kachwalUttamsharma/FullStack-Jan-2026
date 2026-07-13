import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getShowById } from "../api/shows";
import moment from "moment";
import { message, Button, Card } from "antd";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { bookShow, makePayment } from "../api/booking";

const BookingShow = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const fetchShow = async () => {
    try {
      const response = await getShowById({
        showId: id,
      });
      if (!response.success) {
        message.warning(response.message);
        return;
      }
      setShow(response.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    }

    fetchShow();
  }, []);

  const bookShowTicket = async (transactionId) => {
    try {
      const response = await bookShow({
        show: show._id,
        transactionId,
        seats: selectedSeats,
        user: user._id,
      });

      if (!response?.success) {
        message.warning(response.message);
        return;
      }

      message.success("Show Booked Successfully");
      navigate("/myBookings");
    } catch (error) {
      message.error(error.message);
    }
  };

  const handlePayment = async () => {
    if (!user) {
      message.warning("User information not found.");
      return;
    }
    if (!stripe || !elements) {
      message.warning("Stripe not loaded.");
      return;
    }

    if (selectedSeats.length === 0) {
      message.warning("Please select at least one seat.");
      return;
    }

    try {
      setIsProcessing(true);
      const response = await makePayment({
        amount: selectedSeats.length * show.ticketPrice * 100,
        description: `${show.movie.title} - ${selectedSeats.length} Tickets`,
        userId: user._id,
        name: user.name
      });

      if (!response?.success) {
        message.warning(response.message);
      }
      const { clientSecret } = response?.data;
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user.name,
              email: user.email,
            },
          },
        },
      );

      if (error) {
        message.error(error.message);
        return;
      }

      await bookShowTicket(paymentIntent.id);
    } catch (error) {
      message.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber],
    );
  };

  const getSeats = () => {
    if (!show) return null;

    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <p style={{ width: "700px" }}>
          Screen this side, you will be watching in this direction
        </p>

        <div className="screen-div" />

        <ul
          className="seat-ul justify-content-center"
          style={{ marginTop: "1rem", marginLeft: "4rem" }}
        >
          {Array.from({ length: rows }).map((_, rowIndex) => {
            {
              return Array.from({ length: columns }).map((_, columnIndex) => {
                const seatNumber = rowIndex * columns + columnIndex + 1;

                if (seatNumber > totalSeats) return null;
                let classname = "seat-btn";

                const isBooked = show.bookedSeats.includes(seatNumber);
                const isSelected = selectedSeats.includes(seatNumber);

                if (isBooked) {
                  classname += " booked";
                }
                if (isSelected) {
                  classname += " selected";
                }
                return (
                  <li key={seatNumber}>
                    <Button
                      className={classname}
                      onClick={() => toggleSeat(seatNumber)}
                    >
                      {seatNumber}
                    </Button>
                  </li>
                );
              });
            }
          })}
        </ul>
      </div>
    );
  };
  return (
    <div
      style={{
        scroll: "auto",
        maxHeight: "90%",
      }}
    >
      {show && (
        <Card
          style={{
            maxWidth: "1200px",
            margin: "20px auto",
          }}
          title={
            <div>
              <h1>{show.movie.title}</h1>
              <p>
                {show.theatre.name}, {show.theatre.address}
              </p>
            </div>
          }
        >
          {/* { show details} */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "40px",
              margin: "1rem",
            }}
          >
            <div style={{ flex: 1, minWidth: "300px" }}>
              <h3>
                <span>Show Name:</span> {show.name}
              </h3>

              <h3>
                <span>Date:</span> {moment(show.date).format("MMM Do YYYY")}
              </h3>

              <h3>
                <span>Time:</span>{" "}
                {moment(show.time, "HH:mm").format("hh:mm A")}
              </h3>
            </div>

            <div style={{ flex: 1, minWidth: "300px" }}>
              <h3>
                <span>Ticket Price:</span> ₹{show.ticketPrice}
              </h3>

              <h3>
                <span>Total Seats:</span> {show.totalSeats}
              </h3>

              <h3>
                Available Seats: {show.totalSeats - show.bookedSeats.length}
              </h3>
            </div>
          </div>

          {/* seats arrangements */}
          {getSeats()}

          {/* payment section */}

          {selectedSeats.length > 0 && (
            <div
              style={{
                maxWidth: "600px",
                margin: "30px auto",
              }}
            >
              <h2>
                Total Amount : ₹
                {selectedSeats.length * (show?.ticketPrice || 0)}
              </h2>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "24px",
                    },
                  },
                }}
              />
              <Button
                type="primary"
                block
                size="large"
                style={{ marginTop: 20 }}
                onClick={handlePayment}
                disabled={isProcessing}
              >
                Pay Now
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default BookingShow;
