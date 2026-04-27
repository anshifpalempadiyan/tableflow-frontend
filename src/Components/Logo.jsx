import React from 'react'
import { Icon } from "@iconify/react";


const Logo = () => {
    return (
        <div className='flex flex-row items-center justify-center gap-2'>
            <div className="p-1 bg-logo rounded-lg w-fit h-fit ">
                <Icon className='text-white  font-extrabold sm:text-lg md:text-xl lg:text-2xl ' icon="flowbite:grid-outline" />
            </div>
            <div className="">
                <h3 className="text-black sm:text-lg md:text-xl lg:text-2xl font-semibold">TableFlow</h3>
            </div>

        </div>
    )
}

export default Logo
