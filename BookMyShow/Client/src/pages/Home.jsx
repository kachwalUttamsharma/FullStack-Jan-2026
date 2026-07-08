import React from "react";
import { useEffect } from "react";
import { currentUser } from "../api/authApi";
import { useState } from "react";
import { Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getAllMovies } from "../api/movies";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const getData = async () => {
    try {
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.warning(response.message);
      }
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto 30px",
        }}
      >
        <Input
          placeholder="Type here to search for movie"
          prefix={<SearchOutlined />}
          onChange={handleSearch}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
        }}
      >
        {movies
          ?.filter((movie) =>
            movie.title.toLowerCase().includes(searchText.toLowerCase()),
          )
          .map((movie) => (
            <div
              key={movie._id}
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={movie.poster}
                alt={movie.movieName}
                width={200}
                height={200}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                  boxShadow: "0 4px 8px rgba(0,0,0,.1)",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() =>
                  navigate(
                    `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`,
                  )
                }
              />
              <h3 style={{ marginTop: "10px" }}>{movie.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
