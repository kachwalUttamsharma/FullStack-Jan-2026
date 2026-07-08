import { Layout, Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { currentUser } from "../api/authApi";

const ProtectedRoute = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await currentUser();
    if (response.success) {
      setUserInfo(response?.data);
      localStorage.setItem("userInfo", JSON.stringify(response?.data));
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("bookmyshow_token")) {
      navigate("/login");
    } else {
      try {
        fetchUser();
      } catch (error) {
        message.error(error);
      }
    }
    () => {
      setUserInfo(null);
    };
  }, []);

  const navItems = [
    {
      key: "Home",
      label: <span onClick={() => navigate("/")}>Home</span>,
      icon: <HomeOutlined />,
    },
    {
      key: "roleProfiler",
      label: (
        <span
          onClick={() => {
            if (userInfo?.role === "admin") {
              navigate("/admin");
            } else if (userInfo?.role === "user") {
              navigate("/myBookings");
            } else {
              navigate("/partner");
            }
          }}
        >
          Role Profiler
        </span>
      ),
      icon: <BookOutlined />,
    },
    {
      key: "Logout",
      label: (
        <span
          onClick={() => {
            localStorage.removeItem("bookmyshow_token");
            navigate("/login");
          }}
        >
          Logout
        </span>
      ),
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <Layout>
      <Header className="header">
        <h3 className="text-white m-0">BookMyShow</h3>
        <Menu theme="dark" mode="horizontal" items={navItems} />
      </Header>
      <Content>{children}</Content>
      <Footer className="footer">
        BookMyShow {new Date().getFullYear()} Created By Scaler Team
      </Footer>
    </Layout>
  );
};

export default ProtectedRoute;
