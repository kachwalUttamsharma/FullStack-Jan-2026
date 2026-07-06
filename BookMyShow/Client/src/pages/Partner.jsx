import React from "react";
import ThreatreList from "../components/Partner/TheatreList";
import { Tabs } from "antd";

const Partner = () => {
  const items = [
    {
      key: "theatres",
      label: "Theatre",
      children: <ThreatreList />,
    },
  ];
  return (
    <div style={{ padding: "1rem", margin: "1rem" }}>
      <h1>Partners Page</h1>
      <Tabs items={items} defaultActiveKey="theatres" />
    </div>
  );
};

export default Partner;
