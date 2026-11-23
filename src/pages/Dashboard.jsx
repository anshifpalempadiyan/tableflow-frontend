import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar.jsx'
import { getFloor } from '../api/floor/floor.js'
import { useNavigate } from 'react-router'

const Dashboard = () => {

  let navigate = useNavigate()


  useEffect(() => {

    const fetchProfile = async () => {
      const userLayoutData = await getFloor()

      if (!userLayoutData.status) {
        navigate('/setup')
      }

      console.log(userLayoutData.data, "data")
    }

    fetchProfile()
  },)



  return (
    <>
      <div className="w-full h-screen flex justify-center items-start ">
        <Navbar />
      </div>
    </>
  )
}

export default Dashboard
