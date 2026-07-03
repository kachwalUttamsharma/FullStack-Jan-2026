import { Tabs } from 'antd'
import React from 'react'
import MovieTable from '../components/Admin/MovieTable'
import TheatreTable from '../components/Admin/TheatreTable'

const Admin = () => {

  const tabItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieTable />
    },
    {
      key: "2",
      label: "Theaters",
      children: <TheatreTable />
    }
  ]
  return (
    <div style={{padding: "1rem", margin: "1rem"}}>
      <h1>Admin Dashboard</h1>
      <Tabs items={tabItems} defaultActiveKey='1'/>
    </div>
  )
}

export default Admin