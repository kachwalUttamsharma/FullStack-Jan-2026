import React, { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import { Button, Table, message } from "antd";
import { getAllMovies, deleteMovie } from "../../api/movies";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import DeleteMovieModal from "./DeleteMovieModal";

const MovieTable = () => {
  const [open, setOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleEdit = (movie) => {
    setSelectedMovie({ releaseDate: moment(movie.date).format("YYYY-MM-DD") ,...movie});
    setOpen(true);
  }

   const fetchMovies = async () => {
    // Fetch movies from the API and update the state
    try{
      setLoading(true);
      const response = await getAllMovies();
      if(response.success) {
        setMovies(response.data);
      } else {
        message.warning(response.message);
      }
    } catch(error) {
      console.error("Error fetching movies:", error);
      message.error("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (movie) => {
    setSelectedMovie(movie);
    setIsDeleteModalOpen(true);
  };

 
  useEffect(() => {
    fetchMovies();
    () => {
      setMovies([]);
    }
  }, []);
  const tableColumns = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, record) => (
        <img src={record.poster} alt="poster" width="70" />
      ),
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      ellipsis: true,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text, record) => `${record.duration} mins`,
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "date",
      render: (text, record) => new Date(record.date).toLocaleDateString(),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "0.2rem" }}>
          <Button type="primary" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button type="danger" onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </div>
      ),
    }
  ];
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Movie
        </Button>
      </div>
      <Table dataSource={movies} columns={tableColumns} rowKey="_id" loading={loading} />
      <MovieForm open={open} setOpen={setOpen}  selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} fetchMovies={fetchMovies}/>
      {isDeleteModalOpen && (
        <DeleteMovieModal isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} fetchMovies={fetchMovies}/>
      )}
    </>
  );
};

export default MovieTable;
