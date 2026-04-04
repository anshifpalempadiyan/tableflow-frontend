import React from 'react'
import { Link } from 'react-router'

const Login = () => {
    return (
        <>
            <div className="w-full h-screen bg-[#f3f3f3] flex justify-center items-center  ">
                <div className=" flex flex-col items-start justify-start bg-white max-w-[450px] w-full h-fit shadow-lg shadow-slate-500/90 rounded-[18px] py-8 px-8 gap-5">
                    <div className="w-full h-fit py-2 flex justify-center">
                        <h1 className="capitalize text-black text-3xl  font-semibold">Login</h1>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center gap-2">

                        <div className=" w-full flex flex-col items-start justify-center h-fit py-3 gap-1">
                            <label className='text-base font-extralight capitalize text-black ' >username</label>
                            <input type="text" className="w-full font-extralight  border border-[#9c9c9c] bg-[#fcfcfc] outline-none text-base rounded-[6px] p-2 " />
                        </div>

                        <div className=" w-full flex flex-col items-start justify-center h-fit py-3 gap-1">
                            <label className='text-base font-extralight capitalize text-black ' >email</label>
                            <input type="text" className="w-full font-extralight  border border-[#9c9c9c] bg-[#fcfcfc] outline-none text-base rounded-[6px] p-2 " />
                        </div>
                        <div className=" w-full flex flex-col items-start justify-center h-fit py-3 gap-1">
                            <label className='text-base font-extralight capitalize text-black ' >password</label>
                            <input type="text" className="w-full font-extralight  border border-[#9c9c9c] bg-[#fcfcfc] outline-none text-base rounded-[6px] p-2 " />
                        </div>
                    </div>
                    <Link className="w-full h-fit flex justify-center  bg-[#4b49ac] text-white hover:text-[#4b49ac] hover:bg-white text-xl font-light border border-[#4b49ac]  transition ease-in duration-75 py-4 mt-3 rounded-[18px]">
                            <h4 className="capitalize">Login</h4>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Login
// bg-[#f3f3f3]