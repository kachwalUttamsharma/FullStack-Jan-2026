import React, { useEffect, useState } from "react";
import { getMovieById } from "../api/movies";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { message, Input, Divider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import moment from "moment";
import { getAllTheatresAndShowsByMovie } from "../api/shows";

const SingleMovie = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [date, setDate] = useState(
    moment(searchParams.get("date")).format("YYYY-MM-DD"),
  );

  const getMovie = async () => {
    try {
      const response = await getMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.warning(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleDate = (e) => {
    const selectedDate = moment(e.target.value).format("YYYY-MM-DD");
    setDate(selectedDate);
    navigate(`/movie/${params.id}?date=${selectedDate}`);
  };
  useEffect(() => {
    getMovie();
  }, []);

  const getThetres = async () => {
    try {
      const response = await getAllTheatresAndShowsByMovie({
        movie: params.id,
        date,
      });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.warning(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getThetres();
  }, [date]);
  return (
    <div className="inner-container" style={{ paddingTop: 20 }}>
      {movie && (
        <div className="d-flex single-movie-div">
          <div className="flex-shrink-0 me-3 single-movie-img">
            <img src={movie.poster} width={150} alt={movie.title} />
          </div>

          <div className="w-100">
            <h1>{movie.title}</h1>

            <p className="movie-data">
              Language: <span>{movie.language}</span>
            </p>

            <p className="movie-data">
              Genre: <span>{movie.genre}</span>
            </p>

            <p className="movie-data">
              Release Date:
              <span>{moment(movie.date).format("MMM Do YYYY")}</span>
            </p>

            <p className="movie-data">
              Duration: <span>{movie.duration} Minutes</span>
            </p>

            <hr />

            <div className="d-flex flex-column-mob align-items-center mt-3">
              <label className="me-3 flex-shrink-0">Choose the date:</label>

              <Input
                type="date"
                value={date}
                min={moment().format("YYYY-MM-DD")}
                prefix={<CalendarOutlined />}
                className="max-width-300 mt-8px-mob"
                onChange={handleDate}
              />
            </div>
          </div>
        </div>
      )}

       {theatres.length === 0 && (
        <div className="pt-3">
          <h2 className="blue-clr">
            Currently, no theatres available for this movie!
          </h2>
        </div>
      )}

         {theatres.length > 0 && (
        <div className="theatre-wrapper mt-3 pt-3">
          <h2>Theatres</h2>

          {theatres.map((theatre) => (
            <div key={theatre._id}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "24px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: "1 1 250px" }}>
                  <h3>{theatre.name}</h3>
                  <p>{theatre.address}</p>
                </div>

                <div style={{ flex: "2 1 450px" }}>
                  <ul className="show-ul">
                    {theatre.shows
                      .sort(
                        (a, b) =>
                          moment(a.time, "HH:mm") -
                          moment(b.time, "HH:mm")
                      )
                      .map((show) => (
                        <li
                          key={show._id}
                          onClick={() =>
                            navigate(`/book-show/${show._id}`)
                          }
                        >
                          {moment(show.time, "HH:mm").format(
                            "hh:mm A"
                          )}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <Divider />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
