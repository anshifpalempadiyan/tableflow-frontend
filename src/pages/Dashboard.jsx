import React from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const navigate = useNavigate()

  const handlelogout = () => {
    localStorage.clear()
    navigate('/')
    
  }
  return (
    <>
        <div className="w-full h-screen flex justify-center items-start ">
            <Link onClick={handlelogout}  className='p-4 bg-red-500 rounded'>Logout</Link>
        </div>
    </>
  )
}

export default Dashboard
