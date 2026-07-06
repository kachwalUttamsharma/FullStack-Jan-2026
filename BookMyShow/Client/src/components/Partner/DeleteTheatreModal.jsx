import { message, Modal } from "antd";
import React from "react";
import { deleteTheatre } from "../../api/theatre";

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  fetchTheatres,
}) => {
  const handleOk = async () => {
    try {
      const theatreId = selectedTheatre._id;
      const response = await deleteTheatre(theatreId);
      if (response.success) {
        message.success(response.message);
      } else {
        message.warning(response.message);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedTheatre(null);
      fetchTheatres();
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };
  return (
    <Modal
      title="Delete Theatre"
      open={isDeleteModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p className="pt-3 fs-18">
        Are you sure you want to delete this Theatre {selectedTheatre.name}
      </p>
      <p className="pb-3 fs-18">
        This action can't be undone and you'll lose this Theatre data
      </p>
    </Modal>
  );
};

export default DeleteTheatreModal;
