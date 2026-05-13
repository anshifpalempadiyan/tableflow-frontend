import React from 'react'
import { Icon } from "@iconify/react";
import { Link } from 'react-router-dom';


const Logo = () => {
    return (
        <Link to={"/"} className='flex flex-row items-center justify-center gap-2'>
            <div className="p-1 bg-logo rounded-lg w-fit h-fit ">
                <Icon className='text-white  font-extrabold sm:text-lg md:text-xl lg:text-2xl ' icon="flowbite:grid-outline" />
            </div>
            <div className="">
                <h2 className="text-black sm:text-lg md:text-xl lg:text-2xl font-semibold">TableFlow</h2>
            </div>

        </Link>
    )
}

export default Logo
