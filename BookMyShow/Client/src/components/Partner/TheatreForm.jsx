import React from "react";
import { Col, Modal, Row, Form, Input, Button, message } from "antd";
import { addTheatre, updateTheatre } from "../../api/theatre";

const TheatreForm = ({
  open,
  setOpen,
  selectedTheatre,
  setSelectedTheatre,
  fetchTheatre,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const payload = {
      ...values,
      owner: JSON.parse(localStorage.getItem("userInfo"))._id
    };
    let response;
    if (selectedTheatre) {
      payload._id = selectedTheatre._id;
      response = await updateTheatre(selectedTheatre._id, payload);
    } else {
      response = await addTheatre(payload);
    }
    if (response.success) {
      message.success(response.message);
      setOpen(false);
      form.resetFields();
      setSelectedTheatre(null);
      fetchTheatre();
    } else {
      message.error(response.message);
    }
  };

  return (
    <Modal
      title="Add Theatre"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Theatre Name"
          name="name"
          rules={[{ required: true, message: "Please enter the Theatre name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Theatre Address"
          name="address"
          rules={[
            { required: true, message: "Please enter the theatre address" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email address" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter the phone number" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheatreForm;
