import React from "react";
import { Form, Input, Modal, message } from "antd";
import { addMovie, updateMovie } from "../../api/movies";

const MovieForm = ( {open, setOpen, selectedMovie, setSelectedMovie, fetchMovies}) => {

   const [form] = Form.useForm();

   const onFinish = async (values) => {
    const payload = {
        ...values,
        duration: parseInt(values.duration),
        date: new Date(values.releaseDate),
    }
    let response;
    if(selectedMovie) {
        payload._id = selectedMovie._id;
        response = await updateMovie(selectedMovie._id, payload);
    } else {
        response = await addMovie(payload);
    }
    if(response.success) {
        message.success(response.message);
        setOpen(false);
        form.resetFields();
        setSelectedMovie(null);
        fetchMovies();
    } else {
        message.error(response.message);
    }
   }

  return (
    <Modal
      title="Add Movie"
      open={open}
      onOk={() => form.submit()}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish} initialValues={selectedMovie}>
        <Form.Item
          label="Movie Name"
          name="title"
          rules={[{ required: true, message: "Please enter the movie name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please enter the movie description" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Poster URL"
          name="poster"
          rules={[{ required: true, message: "Please enter the poster URL" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Duration (in minutes)"
          name="duration"
          rules={[
            { required: true, message: "Please enter the movie duration" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Language"
          name="language"
          rules={[
            { required: true, message: "Please enter the movie language" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Please enter the movie genre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Release Date"
          name="releaseDate"
          rules={[{ required: true, message: "Please enter the release date" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieForm;
