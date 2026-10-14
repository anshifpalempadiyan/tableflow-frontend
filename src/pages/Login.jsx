import React, { useState } from 'react'
import { Link } from 'react-router'
import { userLogin } from '../api/auth/auth'
import { useNavigate } from 'react-router'
import Logo from '../Components/Logo.jsx'
import { Icon } from '@iconify/react'


const Login = () => {

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading , setIsLoading ] = useState(false)
    let navigate = useNavigate()





    const handleLogin = async () => {

        

        if (!email.trim()) {
            setErrorMsg("Email is required")
            return
        }
        if (!password.trim()) {
            setErrorMsg("Password is required")
        }

        setIsLoading(true)

        const userData = {
            password: password,
            email: email,
        }

        const data = await userLogin(userData)
        if (data.status) {
            navigate('/dashboard')
            navigate(0)
            localStorage.setItem("keepLoggedIn", JSON.stringify(true))
            alert(data.msg || 'Login successfull')
        } else {
            setIsLoading(false)
            console.log(errorMsg)
            setErrorMsg(data.msg)
        }

    }


    return (
        <>
            <div className="min-h-screen w-full p-4  items-center justify-center flex bg-white bg-gradient-to-br from-primary/15   via-white to-accent/15">
                <div className="absolute top-6 left-6">
                    <Logo />
                </div>
                <div className="bg-white flex flex-col justify-start items-center min-w-[400px] h-fit border border-[#E5E5E5] shadow-xl  rounded-2xl py-8 px-6  gap-4 ">
                    <div className="flex flex-col justify-start items-center w-full h-fit gap-3 mb-8">
                        <h3 className="text-black text-2xl font-bold capitalize ">welcome back</h3>
                        <p className="text-sm text-[#000000b4] ">Sign in to manage your restaurant floor</p>
                    </div>
                    <div className="w-full h-fit flex flex-col justify-start items-center gap-4 mb-2">
                        <div className="w-full h-fit flex flex-col gap-1">
                            <p className="text-black capitalize text-sm font-medium ">email address</p>
                            <div className="w-full relative">
                                <div className="h-8 w-8  p-1 absolute box-border top-[50%] left-1 transform translate-y-[-50%]">
                                    <Icon className='w-full h-full text-[#7d7b7b] ' icon="fluent:mail-16-regular" />
                                </div>
                                <input value={email} onChange={ (e) => { setEmail(e.target.value); setErrorMsg("") }} type="email" placeholder="your@email.com" required className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-10 text-sm text-[#000000b4] font-medium rounded-lg'  />
                            </div>
                        </div>
                        <div className="w-full h-fit flex flex-col gap-1">
                            <div className="w-full h-fit flex flex-row justify-between items-center">
                                <p className="text-black capitalize text-sm font-medium ">password</p>
                                <a href='/forget-password' className='text-primary capitalize text-xs font-medium hover:underline '>forget password?</a>
                            </div>
                            <div className="w-full relative">
                                <input value={password} onChange={ (e) => { setPassword(e.target.value); setErrorMsg("") }} type={showPassword ? 'text' : 'password'} placeholder="••••••••" required className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-2 text-sm text-[#000000b4] font-medium rounded-lg'  />
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
                    <div className="w-full h-fit ">
                        <button onClick={ handleLogin } disabled={ isLoading } className=" w-full h-fit bg-primary hover:bg-opacity-95 flex justify-center items-center py-3 cursor-pointer rounded-lg">
                            <span className=" text-white text-sm font-medium ">{ isLoading ? 'Verifying...' : 'Log in'}</span>
                        </button>
                    </div>
                    <div className="flex items-center w-full mt-3 mb-3">
                        <div className="flex-grow border-t border-[#E5E5E5]"></div>
                        <span className="px-4 text-xs text-[#7d7b7b] ">
                            OR
                        </span>
                        <div className="flex-grow border-t border-[#E5E5E5]"></div>
                    </div>
                    <div className="flex flex-col justify-start items-center w-full h-fit">
                        <p className="text-sm text-[#000000b4] ">Don't have an account? <Link to={"/signup"} className="text-sm text-primary hover:underline ">Sign Up Here</Link></p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login