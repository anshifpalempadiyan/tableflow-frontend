import React from 'react'
import { Link } from 'react-router'

const ToLoginPage = () => {
  return (
    <>
        <div className="w-full h-screen flex justify-center items-start ">
            <Link to={"/login"} className='p-4 bg-blue-500 rounded'>Login</Link>
        </div>
    </>
  )
}

export default ToLoginPage
