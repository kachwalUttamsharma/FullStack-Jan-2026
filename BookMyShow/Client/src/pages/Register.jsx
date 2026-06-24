import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../api/authApi";

const Register = () => {
    const onFinish = async (values) => {
        const response = await registerUser(values);
        console.log(response);
    }
  return (
    <main className="App-header">
      <h1>Register On BookMyShow</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            htmlFor="name"
            name="name"
            rules={[{ required: true, message: "Name is Required" }]}
          >
            <Input id="name" type="text" placeholder="Enter Your Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input id="email" type="text" placeholder="Please Enter Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            htmlFor="password"
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Password must be at least 6 Character" },
            ]}
          >
            <Input.Password
              id="password"
              placeholder="Please Enter Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ fontSize: "1rem", fontWeight: "600" }}
              block
              htmlType="submit"
            >
              Register
            </Button>
          </Form.Item>
        </Form>

        <div>
            <p>Already Registered ? <Link to="/login">Login Here</Link></p>
        </div>
      </section>
    </main>
  );
};

export default Register;
