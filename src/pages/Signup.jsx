import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { userOTPSending, userOTPVerifying, userSignup } from '../api/auth/auth'
import { useNavigate } from 'react-router'
import Logo from '../Components/Logo'
import { Icon } from '@iconify/react'

const Signup = () => {
    const [userName, setUserName] = useState("")
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [otpSection, setOtpSection] = useState(false)
    const [otp, setOtp] = useState("")
    const [cooldown, setCooldown] = useState(0);
    const [isVerify, setIsVerify] = useState(false)
    let navigate = useNavigate()




    useEffect(() => {

        let timer;
        if (cooldown > 0) {

            timer = setInterval(() => {
                setCooldown((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [cooldown])


    const handleSignup = async () => {

        if (!userName.trim()) {
            setErrorMsg("Username is required")
            return
        }

        if (!email.trim()) {
            setErrorMsg("Email is required")
            return
        }
        if (!passwordOne.trim()) {
            setErrorMsg("Password is required")
            return
        }
        if (passwordOne !== passwordTwo) {
            setErrorMsg("Password not maching")
            return
        }

        setIsLoading(true)



        const userEmailData = { email: email }

        const emailOTPSending = await userOTPSending(userEmailData)
        if (emailOTPSending.status) {
            setOtpSection(true)
            setIsLoading(false)
            setCooldown(60);
            setErrorMsg(null);
            alert("Verification code sent to your email!");



        } else {

            setIsLoading(false)
            setErrorMsg(emailOTPSending.error || "Failed to send OTP");


        }



    }

    const handleOTPVerifyingandSignup = async () => {

        if (!otp.trim()) {
            setErrorMsg("OTP is required")
            return
        }

        setIsVerify(true)

        const password = passwordOne
        const userData = {
            userName: userName,
            password: password,
            email: email,
        }

        const userOTPData = { email, otp }
        const emailOTPVerification = await userOTPVerifying(userOTPData)
        if (emailOTPVerification.status) {

            const data = await userSignup(userData)

            if (data.status) {
                console.log(data, "data")
                alert(data.msg || 'Login successfull')
                // const token = data.accessToken
                // localStorage.setItem("authToken", token)
                localStorage.setItem("keepLoggedIn", JSON.stringify(true))
                // navigate('/dashboard')
                window.location.href = '/dashboard'
            } else {
                console.log(errorMsg)
                setErrorMsg(data.msg)
            }

        } else {

            setErrorMsg(emailOTPVerification.msg || emailOTPVerification.error || "Email Verification failed")

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
                        <h3 className="text-black text-2xl font-bold capitalize ">Create Your Account</h3>
                        <p className="text-sm text-[#000000b4] ">Start managing your restaurant today</p>
                    </div>
                    {otpSection ? (

                        <div className="w-full h-fit flex flex-col gap-1">
                            <p className="text-black capitalize text-sm font-medium ">Verification Code</p>
                            <div className="w-full relative">
                                <input value={otp} onChange={(e) => { setOtp(e.target.value); setErrorMsg("") }} type="text" placeholder="******"
                                    className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-4 text-sm text-[#000000b4] font-medium rounded-lg tracking-widest placeholder:tracking-widest placeholder:text-xl placeholder:translate-y-1' />
                            </div>
                        </div>

                    ) : (
                        <div className="w-full h-fit flex flex-col justify-start items-center gap-4 mb-2">
                            <div className="w-full h-fit flex flex-col gap-1">
                                <p className="text-black capitalize text-sm font-medium ">restaurant name / username</p>
                                <div className="w-full relative">
                                    <div className="h-7 w-7  p-1 absolute box-border top-[50%] left-1 transform translate-y-[-50%]">
                                        <Icon className='w-full h-full text-[#7d7b7b] ' icon="solar:buildings-3-linear" />
                                    </div>
                                    <input value={userName} onChange={(e) => { setUserName(e.target.value); setErrorMsg("") }} type="email" placeholder="e.g., My Restaurant" className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-10 text-sm text-[#000000b4] font-medium rounded-lg' />
                                </div>
                            </div>
                            <div className="w-full h-fit flex flex-col gap-1">
                                <p className="text-black capitalize text-sm font-medium ">email address</p>
                                <div className="w-full relative">
                                    <div className="h-8 w-8  p-1 absolute box-border top-[50%] left-1 transform translate-y-[-50%]">
                                        <Icon className='w-full h-full text-[#7d7b7b] ' icon="fluent:mail-16-regular" />
                                    </div>
                                    <input value={email} onChange={(e) => { setEmail(e.target.value); setErrorMsg("") }} type="email" placeholder="your@email.com" required className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-10 text-sm text-[#000000b4] font-medium rounded-lg' />
                                </div>
                            </div>
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
                    )
                    }

                    {

                        errorMsg && <div className="w-full h-fit text-red-600  bg-transparent flex justify-start items-center text-sm">
                            <p className="">{errorMsg}</p>
                        </div>
                    }
                    <div className="w-full h-fit flex flex-col items-center gap-3">
                        {otpSection ? (

                            <>

                                <button onClick={() => { handleOTPVerifyingandSignup() }} disabled={isVerify} type='submit' className={` w-full h-fit bg-primary hover:bg-opacity-95 active:bg-opacity-95 flex justify-center items-center py-3 cursor-pointer  rounded-lg transition-all
                            ${isVerify
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-primary hover:bg-opacity-95'
                                    }
                            `}>
                                    <span className=" text-white text-sm font-medium ">{isVerify ? 'Verifying...' : 'Verify'}</span>
                                </button>

                                <div className="text-sm">
                                    {
                                        cooldown > 0 ? (
                                            <span className="text-[#7d7b7b]">Resend code in {cooldown}s</span>
                                        ) : (

                                            <button
                                                onClick={() => { handleSignup() }}
                                                disabled={isLoading}
                                                type="button"
                                                className="text-primary hover:underline cursor-pointer font-medium"
                                            >
                                                {isLoading ? 'Sending...' : 'Resend Verification Code'}
                                            </button>
                                        )
                                    }
                                </div>
                            </>

                        ) : (
                            <>
                                <button onClick={() => { handleSignup() }} disabled={isLoading} type='submit' className={` w-full h-fit bg-primary hover:bg-opacity-95 active:bg-opacity-95 flex justify-center items-center py-3 cursor-pointer  rounded-lg transition-all
                            ${isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-primary hover:bg-opacity-95'
                                    }
                            `}>
                                    <span className=" text-white text-sm font-medium ">{isLoading ? 'Sending...' : 'Sign up'}</span>
                                </button>



                            </>
                        )
                        }

                    </div>
                    <div className="flex items-center w-full mt-3 mb-3">
                        <div className="flex-grow border-t border-[#E5E5E5]"></div>
                        <span className="px-4 text-xs text-[#7d7b7b] ">
                            OR
                        </span>
                        <div className="flex-grow border-t border-[#E5E5E5]"></div>
                    </div>
                    <div className="flex flex-col justify-start items-center w-full h-fit">
                        <p className="text-sm text-[#000000b4] ">Already have an account? <Link to={"/login"} className="text-sm text-primary hover:underline ">Login Here</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup

