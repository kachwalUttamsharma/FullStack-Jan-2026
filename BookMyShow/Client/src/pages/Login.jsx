import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const Login = () => {
  const navigate = useNavigate();
    const onFinish = async (values) => {
      try {
       const response = await loginUser(values);
       if(response.success) {
        message.success(response.message);
        setTimeout(() => {
          localStorage.setItem("bookmyshow_token", response.data);
          navigate("/");
        }, 1500)
       } else {
        message.warning(response.message);
       }
       } catch(error) {
        message.error(error);
       }
    }
  return (
    <main className="App-header">
      <h1>Login to BookMyShow</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={onFinish}>
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
            ]}
          >
            <Input.Password id="password" placeholder="Please Enter Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{fontSize: "1rem", fontWeight: "600"}} block htmlType="submit">Login</Button>
          </Form.Item>
        </Form>

         <section>
          <p>
            New User ? <Link to="/register">Register Here</Link>
          </p>
          <p>
            Forgot Password ? <Link to="/forget">Click Here</Link>
          </p>
        </section>
      </section>
    </main>
  );
};

export default Login;
