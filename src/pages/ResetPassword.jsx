import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import Logo from '../Components/Logo'
import { Icon } from '@iconify/react'
import { userResetPassword } from '../api/auth/auth'




const ResetPassword = () => {

    const location = useLocation()
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate()


    const { email, otp } = location.state.userData || {}

    const handleResetPassword = async () => {

        if (!passwordOne.trim() || !passwordTwo.trim()) {
            setErrorMsg("Password is required")
            return
        }
        if (passwordOne !== passwordTwo) {
            setErrorMsg("Password not maching")
            return
        }

        setIsLoading(true)
        const password = passwordOne
        const userData = { email, otp, newPassword: password }

        const data = await userResetPassword(userData)
        if (data.status) {

            alert("Password updated successfully. Please log in with your new password");
            navigate('/login')

        } else {

            setIsLoading(false)
            setErrorMsg(data.error)
        }
    }



    return (
        <>
            <div className="min-h-screen w-full p-4  items-center justify-center flex bg-white bg-gradient-to-br from-primary/15   via-white to-accent/15">
                <div className="absolute top-6 left-6">
                    <Logo />
                </div>
                <div className="bg-white flex flex-col justify-start items-center min-w-[400px] h-fit border border-[#E5E5E5] shadow-xl  rounded-2xl py-8 px-6  gap-4 ">
                    <div className="flex flex-col justify-start items-center w-full h-fit gap-3 mb-6">
                        <h3 className="text-black text-2xl font-bold capitalize ">Create New Password</h3>
                        <p className="text-sm text-[#000000b4] ">Create a new password to access your restaurant's dashboard</p>
                    </div>
                    <div className="w-full h-fit flex flex-col justify-start items-center gap-4 mb-2">



                        <div className="w-full h-fit flex flex-col gap-1">
                            <div className="w-full h-fit flex flex-row justify-between items-center">
                                <p className="text-black capitalize text-sm font-medium ">password</p>
                            </div>
                            <div className="w-full relative">
                                <input value={passwordOne} onChange={(e) => { setPasswordOne(e.target.value); setErrorMsg("") }} type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-2 text-sm text-[#000000b4] font-medium rounded-lg' />
                                <Link onClick={() => { setShowPassword(!showPassword) }} className="h-7 w-7  p-1 text-[#7d7b7b] hover:text-black absolute box-border top-[50%] right-1 transform translate-y-[-50%]">
                                    <Icon className='w-full h-full  ' icon={showPassword ? "ph:eye-slash" : "lucide:eye"} />
                                </Link>
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-col gap-1">
                            <div className="w-full h-fit flex flex-row justify-between items-center">
                                <p className="text-black capitalize text-sm font-medium ">confirm password</p>
                            </div>
                            <div className="w-full relative">
                                <input value={passwordTwo} onChange={(e) => { setPasswordTwo(e.target.value); setErrorMsg("") }} type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-2 text-sm text-[#000000b4] font-medium rounded-lg' />
                                <Link onClick={() => { setShowPassword(!showPassword) }} className="h-7 w-7  p-1 text-[#7d7b7b] hover:text-black absolute box-border top-[50%] right-1 transform translate-y-[-50%]">
                                    <Icon className='w-full h-full  ' icon={showPassword ? "ph:eye-slash" : "lucide:eye"} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {

                        errorMsg && <div className="w-full h-fit text-red-600  bg-transparent flex justify-start items-center text-sm">
                            <p className="">{errorMsg}</p>
                        </div>
                    }
                    <div className="w-full h-fit flex flex-col items-center gap-3">

                        <div className="w-full h-fit ">
                            <button onClick={() => { handleResetPassword() }} disabled={isLoading} type='submit' className=" w-full h-fit bg-primary hover:bg-opacity-95 flex justify-center items-center py-3 cursor-pointer rounded-lg">
                                <span className=" text-white text-sm font-medium ">Update Password and Re-Login</span>
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ResetPassword

