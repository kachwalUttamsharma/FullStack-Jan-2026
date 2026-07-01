import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ( { children }) => {
    const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("bookmyshow_token")) {
        navigate("/login");
    }
  },[]);
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute