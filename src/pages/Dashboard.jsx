import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
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
            <button onClick={() => handlelogout()}  className='p-4 bg-red-500 rounded'>Logout</button>
        </div>
    </>
  )
}

export default Dashboard
