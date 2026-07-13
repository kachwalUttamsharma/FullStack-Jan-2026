import React, { useState, useEffect } from "react";
import { getAllBookings } from "../api/booking";
import { Link } from "react-router-dom";
import { Button, Card, message } from "antd";
import moment from "moment";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const getData = async () => {
    try {
      const response = await getAllBookings();
      if (response.success) {
        setBookings(response.data);
      } else {
        message.warning(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <>
      {bookings.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            gap: "24px",
            padding: "16px",
          }}
        >
          {bookings.map((booking) => (
            <Card key={booking._id}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "flex-start",
                }}
              >
                <img
                  src={booking.show.movie.poster}
                  alt={booking.show.movie.title}
                  style={{
                    width: "100px",
                    borderRadius: "8px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h2 style={{ marginBottom: "10px" }}>
                    {booking.show.movie.title}
                  </h2>

                  <p>
                    <strong>Theatre:</strong> {booking.show.theatre.name}
                  </p>

                  <p>
                    <strong>Seats:</strong> {booking.seats.join(", ")}
                  </p>

                  <p>
                    <strong>Date & Time:</strong>
                    {moment(booking.show.date).format("MMM Do YYYY")} |{" "}
                    {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                  </p>

                  <p>
                    <strong>Amount:</strong> ₹
                    {booking.seats.length * booking.show.ticketPrice}
                  </p>

                  <p>
                    <strong>Booking ID:</strong> {booking.transactionId}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
          }}
        >
          <h2>You've not booked any show yet!</h2>

          <Link to="/">
            <Button type="primary" size="large">
              Start Booking
            </Button>
          </Link>
        </div>
      )}
    </>
};

export default MyBookings;
