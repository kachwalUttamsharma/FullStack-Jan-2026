import { Button, message, Table } from "antd";
import React, { useState, useEffect } from "react";
import { getAllTheatre, updateTheatre } from "../../api/theatre";

const TheatreTable = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleStatusCHange = async (theatre) => {
    try {
      const payload = {
        ...theatre,
        isActive: !theatre.isActive,
      };
      const response = await updateTheatre(theatre._id, payload);
      if (response.success) {
        message.success(response.message);
        fetchTheatre();
      }
    } catch (error) {
      message.error("error");
    }
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
          {record.isActive ? (
            <Button onClick={() => handleStatusCHange(record)}>Block</Button>
          ) : (
            <Button onClick={() => handleStatusCHange(record)}>Approve</Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={theatres}
        columns={tableColumns}
        rowKey="_id"
        loading={loading}
      />
    </div>
  );
};

export default TheatreTable;
