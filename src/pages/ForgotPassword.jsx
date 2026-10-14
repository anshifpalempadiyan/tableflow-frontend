import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userOTPVerifying, userOTPSending } from '../api/auth/auth'
import { useNavigate } from 'react-router'
import Logo from '../Components/Logo'
import { Icon } from '@iconify/react'




const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [errorMsg, setErrorMsg] = useState(null)
    const [showOTPSection, setShowOTPSection] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [otpSent, setOtpSent] = useState(false);
    const [isVerify, setIsVerify] = useState(false);
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


    const handleOTP = async () => {

        if (isLoading || cooldown > 0) return;

        if (!email.trim()) {
            setErrorMsg("Email is required")
            return
        }

        const userEmailData = { email: email }
        setIsLoading(true);


        const data = await userOTPSending(userEmailData)
        setIsLoading(false);
        if (data.status) {
            setShowOTPSection(true)
            setCooldown(60);
            setOtpSent(true);
            setErrorMsg(null);
            alert("Verification code sent to your email!");

        } else {
            setErrorMsg(data.error || "Failed to send OTP");
        }
    }

    const handleOTPVerifying = async () => {

        if (!otp.trim()) {
            setErrorMsg("OTP is required")
            return
        }

        const userData = { email, otp }
        setIsVerify(true)

        const data = await userOTPVerifying(userData)

        if (data.status) {
            navigate('/reset-password', {
                state: { userData }
            })

        } else {

            setErrorMsg(data.error)
            setIsVerify(false)
        }






    }

    return (
        <>
            <div className="min-h-screen w-full p-4  items-center justify-center flex bg-white bg-gradient-to-br from-primary/15   via-white to-accent/15">
                <div className="absolute top-6 left-6">
                    <Logo />
                </div>
                <div className="bg-white flex flex-col justify-start items-center min-w-[400px] h-fit border border-[#E5E5E5] shadow-xl  rounded-2xl py-8 px-6  gap-4 ">
                    <div className="flex flex-col justify-start items-center w-full h-fit gap-3 mb-7">
                        <h3 className="text-black text-2xl font-bold capitalize ">Account Recovery</h3>
                        <p className="text-sm text-[#000000b4] ">Enter your restaurant's email address to verify your identity</p>
                    </div>
                    <div className="w-full h-fit flex flex-col justify-start items-center gap-4 mb-2">

                        <div className="w-full h-fit flex flex-col gap-1">
                            <p className="text-black capitalize text-sm font-medium ">email address</p>
                            <div className="w-full relative">
                                <div className="h-8 w-8  p-1 absolute box-border top-[50%] left-1 transform translate-y-[-50%]">
                                    <Icon className='w-full h-full text-[#7d7b7b] ' icon="fluent:mail-16-regular" />
                                </div>
                                <input value={email} onChange={(e) => { setEmail(e.target.value); setErrorMsg("") }} type="email" placeholder="your@email.com" required className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-10 text-sm text-[#000000b4] font-medium rounded-lg' />
                            </div>
                        </div>

                        {showOTPSection &&
                            <div className="w-full h-fit flex flex-col gap-1">
                                <p className="text-black capitalize text-sm font-medium ">Verification Code</p>
                                <div className="w-full relative">
                                    <input value={otp} onChange={(e) => { setOtp(e.target.value); setErrorMsg("") }} type="text" placeholder="******"
                                        className='w-full h-[45px] border-2 border-solid  focus:outline-none  border-[#E5E5E5] focus:border-primary box-border pl-4 text-sm text-[#000000b4] font-medium rounded-lg tracking-widest placeholder:tracking-widest placeholder:text-xl placeholder:translate-y-1' />
                                </div>
                            </div>
                        }
                    </div>

                    {

                        errorMsg && <div className="w-full h-fit text-red-600  bg-transparent flex justify-start items-center text-sm">
                            <p className="">{errorMsg}</p>
                        </div>
                    }
                    <div className="w-full h-fit flex flex-col items-center gap-3">

                        {
                            !otpSent ? (
                                <button onClick={() => { handleOTP() }} disabled={isLoading || cooldown > 0} type='submit'
                                    className={`w-full h-fit bg-primary hover:bg-opacity-95 active:bg-opacity-95 flex justify-center items-center py-3 cursor-pointer rounded-lg transition-all
                                ${isLoading || cooldown > 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-primary hover:bg-opacity-95'
                                        }
                                `}>
                                    <span className={`capitalize text-white text-sm font-medium`}>
                                        {
                                            isLoading ? 'Sending...' : 'Send Verification Code'
                                        }
                                    </span>
                                </button>

                            ) : (
                                <>
                                    <button onClick={() => { handleOTPVerifying() }} disabled={isVerify} type='button'
                                        className={`w-full h-fit bg-primary hover:bg-opacity-95 active:bg-opacity-95 flex justify-center items-center py-3 cursor-pointer rounded-lg transition-all
                                ${isVerify
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-primary hover:bg-opacity-95'
                                            }
                                `}>
                                        <span className={`capitalize text-white text-sm font-medium`}>
                                            {
                                                isVerify ? 'Verifying...' : 'Verify and Reset Password'
                                            }
                                        </span>
                                    </button>

                                    <div className="text-sm">
                                        {
                                            cooldown > 0 ? (
                                                <span className="text-[#7d7b7b]">Resend code in {cooldown}s</span>
                                            ) : (

                                                <button
                                                    onClick={handleOTP}
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
                        <p className="text-sm text-[#000000b4] ">Remember your password? <Link to={"/login"} className="text-sm text-primary hover:underline "> Login Here</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
