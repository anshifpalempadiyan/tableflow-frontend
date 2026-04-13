import React from 'react'
import { useNavigate } from 'react-router'
import { userLogout } from '../api/auth/auth'

const Navbar = () => {
    let navigate = useNavigate()

    const handlelogout = async () => {
        const data = await userLogout()
        console.log(data,"thdate")
        if ( data.status ) {
            navigate('/login')
            localStorage.clear()
            alert("User Logout successfully")

        } else {
            console.log(data,"the data")
            localStorage.clear()
            alert("User can't Logout")
        }

    }
    return (
        <div className=' w-full  h-[80px] flex flex-row items-center justify-end px-3 bg-white shadow-md shadow-slate-500/90'>
            <button onClick={() => handlelogout()} className='p-4 bg-red-500 rounded'>Logout</button>

        </div>
    )
}

export default Navbar
