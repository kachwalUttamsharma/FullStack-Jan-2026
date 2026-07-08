import React, { useState, useEffect } from "react";
import TheatreForm from "./TheatreForm";
import { getAllTheatre } from "../../api/theatre";
import { Button, message, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteTheatreModal from "./DeleteTheatreModal";
import ShowModal from "./ShowModal";

const ThreatreList = () => {
  const [open, setOpen] = useState(false);
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const fetchTheatre = async () => {
    try {
      setLoading(true);
      const response = await getAllTheatre();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.warning(response.message);
      }
    } catch (error) {
      console.error("Error fetching Theatres:", error);
      message.error("Failed to fetch Theatres. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheatre();
    () => {
      setTheatres([]);
    };
  }, []);

  const handleEdit = (theatre) => {
    setSelectedTheatre(theatre);
    setOpen(true);
  };

  const handleDelete = async (theatre) => {
    setSelectedTheatre(theatre);
    setIsDeleteModalOpen(true);
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      ellipsis: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (record.isActive) {
          return "Approved/Running";
        } else {
          return "Pending/Blocked/UnderMaintenance";
        }
      },
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
          {record.isActive && (
            <Button onClick={() => {
              setSelectedTheatre(record);
              setIsShowModalOpen(true);
            }}>
              + Shows
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Button type="primary" onClick={() => setOpen(true)}>
          Add Theatre
        </Button>
      </div>
      <Table
        dataSource={theatres}
        columns={tableColumns}
        rowKey="_id"
        loading={loading}
      />
      <TheatreForm
        open={open}
        setOpen={setOpen}
        selectedTheatre={selectedTheatre}
        setSelectedTheatre={setSelectedTheatre}
        fetchTheatre={fetchTheatre}
      />
      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          fetchTheatres={fetchTheatre}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
        />
      )}
      {
        isShowModalOpen && (
          <ShowModal 
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          />
        )
      }
    </div>
  );
};

export default ThreatreList;
