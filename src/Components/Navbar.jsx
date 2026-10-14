import React from 'react'
import { useNavigate } from 'react-router'
import { userLogout } from '../api/auth/auth'
import { Link } from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate()

    const handlelogout = async () => {
        const data = await userLogout()
        if ( data.status ) {
            navigate('/login')
            localStorage.clear()
            alert("User Logout successfully")

        } else {
            localStorage.clear()
            alert("User can't Logout")
        }

    }
    return (
        <div className=' w-full  h-[80px] flex flex-row items-center justify-end px-3 bg-white shadow-md shadow-slate-500/90'>
            <button onClick={() => handlelogout()} className='p-4 bg-red-500 rounded'>Logout</button>
            <Link to={'/setup'} className='p-4 bg-red-500 rounded'>setup</Link>

        </div>
    )
}

export default Navbar
