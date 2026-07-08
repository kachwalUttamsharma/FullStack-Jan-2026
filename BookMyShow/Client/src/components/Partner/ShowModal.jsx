import { Modal, Form, Input, Button, Select, message, Table } from "antd";
import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { getAllMovies } from "../../api/movies.js";
import {
  getShowsByTheatre,
  addShow,
  updateShow,
  deleteShow,
} from "../../api/shows.js";
import moment from "moment";

const ShowModal = ({
  isShowModalOpen,
  setIsShowModalOpen,
  selectedTheatre,
  setSelectedTheatre,
}) => {
  const [view, setView] = useState("table");
  const [movies, setMovies] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [shows, setShows] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const allMovies = await getAllMovies();
      if (allMovies.success) {
        setMovies(allMovies.data);
      } else {
        message.warning(allMovies.message);
      }
      const allShows = await getShowsByTheatre({
        theatreId: selectedTheatre._id,
      });
      if (allShows.success) {
        setShows(allShows.data);
      } else {
        message.warning(allShows.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    () => {};
  }, []);

  const handleCancel = () => {
    setIsShowModalOpen(false);
  };

  const handleDelete = async (showId) => {
    try {
      const response = await deleteShow({ showId: showId });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.warning(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      let response = null;
      if (view === "add") {
        response = await addShow({ ...values, theatre: selectedTheatre._id });
      } else {
        response = await updateShow({
          ...values,
          theatre: selectedTheatre._id,
          showId: selectedShow._id,
        });
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setView("table");
      } else {
        message.warning(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Show Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Show Date",
      dataIndex: "date",
      key: "date",
      render: (text, data) => {
        return moment(text).format("MMM Do YYYY");
      },
    },
    {
      title: "Show Time",
      dataIndex: "time",
      render: (text, data) => {
        return moment(text, "HH:mm").format("hh:mm A");
      },
    },
    {
      title: "Movie",
      dataIndex: "title",
      render: (text, data) => {
        return data.movie.title;
      },
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },
    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: "Available Seats",
      dataIndex: "seats",
      render: (text, data) => {
        return data.totalSeats - data.bookedSeats.length;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            <Button
              onClick={() => {
                setView("edit");
                setSelectedShow({
                  ...data,
                  date: moment(data.date).format("YYYY-MM-DD"),
                  movie: data.movie._id,
                });
              }}
            >
              <EditOutlined />
            </Button>
            <Button onClick={() => handleDelete(data._id)}>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      centered
      title={selectedTheatre.name}
      open={isShowModalOpen}
      onCancel={handleCancel}
      width={1200}
      footer={null}
    >
      {view === "table" && (
        <>
          <Button
            type="primary"
            onClick={() => setView("add")}
            style={{ margin: "5px" }}
          >
            Add Show
          </Button>
          <Table
            dataSource={shows}
            columns={columns}
            rowKey="_id"
            loading={loading}
          />
        </>
      )}
      {(view === "edit" || view === "add") && (
        <Form
          layout="vertical"
          initialValues={selectedShow}
          onFinish={onFinish}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            <Form.Item
              label="Show Name"
              name="name"
              rules={[{ required: true, message: "Show name is required!" }]}
            >
              <Input placeholder="Enter the show name" />
            </Form.Item>

            <Form.Item
              label="Show Date"
              name="date"
              rules={[{ required: true, message: "Show date is required!" }]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Show Timing"
              name="time"
              rules={[{ required: true, message: "Show time is required!" }]}
            >
              <Input type="time" />
            </Form.Item>

            <Form.Item
              label="Select Movie"
              name="movie"
              rules={[{ required: true, message: "Movie is required!" }]}
            >
              <Select
                placeholder="Select Movie"
                options={movies.map((movie) => ({
                  value: movie._id,
                  label: movie.title,
                }))}
              />
            </Form.Item>

            <Form.Item
              label="Ticket Price"
              name="ticketPrice"
              rules={[{ required: true, message: "Ticket price is required!" }]}
            >
              <Input type="number" placeholder="Enter ticket price" />
            </Form.Item>

            <Form.Item
              label="Total Seats"
              name="totalSeats"
              rules={[{ required: true, message: "Total seats are required!" }]}
            >
              <Input type="number" placeholder="Enter total seats" />
            </Form.Item>
          </div>

          <div className="d-flex gap-10 mt-3">
            <Button block htmlType="button" onClick={() => setView("table")}>
              <ArrowLeftOutlined /> Go Back
            </Button>

            <Button block type="primary" htmlType="submit">
              {view === "add" ? "Add Show" : "Edit Show"}
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ShowModal;
