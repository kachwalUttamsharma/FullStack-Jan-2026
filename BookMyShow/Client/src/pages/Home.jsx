import { message } from 'antd'
import React from 'react'
import { useEffect } from 'react'
import { currentUser } from '../api/authApi'
import { useState } from 'react'

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(async () => {
    try {
      const response = await currentUser()
      if(response.success) {
        setUserInfo(response?.data);
      }
    } catch(error) {
      message.error(error);
    }
  }, [])
  return (
    <>    <div>Home</div>
    { userInfo && (
      <div>
        <p>{userInfo.name}</p>
        <p>{userInfo.email}</p>
        <p>{userInfo.role}</p>
      </div>
    )}
    </>

  )
}

export default Home