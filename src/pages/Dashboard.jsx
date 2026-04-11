import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar.jsx'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const [ logout , setLogout ] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {

  },[logout])

  const handlelogout = () => {
    setLogout(true)
    localStorage.clear()
    navigate('/login')
    
  }
  return (
    <>
        <div className="w-full h-screen flex justify-center items-start ">
            <Navbar/>
        </div>
    </>
  )
}

export default Dashboard
