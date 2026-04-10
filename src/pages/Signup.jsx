import React, { useState } from 'react'
import { Link } from 'react-router'
import { userSignup } from '../api/auth/auth'
import { useNavigate } from 'react-router'

const Signup = () => {
    const [ userName , setUserName ] = useState("")
    const [ password , setPassword ] = useState("")
    const [ email , setEmail ] = useState("")
    const [ errorMsg , setErrorMsg ] = useState(null)
    let navigate = useNavigate()
    


    

    const handleSignup = async () => {

        if ( !userName.trim() ) {
            setErrorMsg("Username is required")
            return
        }
        
        if ( !email.trim() ) {
            setErrorMsg("Email is required")
            return
        }
        if ( !password.trim() ) {
            setErrorMsg("Password is required")
        }

        const userData = {
            userName : userName,
            password : password,
            email : email,
        }

        const data = await userSignup(userData)

        if ( data.status ) {
            alert( data.msg || 'Login successfull')
            console.log(errorMsg)            
            const token = data.accessToken
            localStorage.setItem("authToken" , token )
            localStorage.setItem("keepLoggedIn" , JSON.stringify(true))
            navigate('/dashboard')
        } else {
            console.log(errorMsg)
            // setErrorMsg(data.msg)
            console.log("why the else work")
        }

    }


    return (
        <>
            <div className="container mx-atu  w-full h-screen bg-[#f3f3f3] flex justify-center items-center  ">
                <div className=" flex flex-col items-start justify-start bg-white max-w-[450px] w-full h-fit shadow-lg shadow-slate-500/90 rounded-[18px]  p-4 md:p-8 gap-5">
                    <div className="w-full h-fit py-2 flex justify-center">
                        <h1 className="capitalize text-black text-3xl  font-semibold">Signup</h1>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center gap-2">

                        <div className=" w-full flex flex-col items-start justify-center h-fit py-3 gap-1">
                            <label className='text-base font-extralight capitalize text-black ' >username</label>
                            <input value={userName} onChange={ (e) => { setUserName(e.target.value); setErrorMsg("")}}  type="text" className="w-full font-extralight  border border-[#9c9c9c] bg-[#fcfcfc] outline-none text-base rounded-[6px] p-2 " />
                        </div>

                        <div className=" w-full flex flex-col items-start justify-center h-fit py-3 gap-1">
                            <label className='text-base font-extralight capitalize text-black ' >email</label>
                            <input value={email} onChange={ (e) => { setEmail(e.target.value); setErrorMsg("") }} type="email" required className="w-full font-extralight  border border-[#9c9c9c] bg-[#fcfcfc] outline-none text-base rounded-[6px] p-2 " />
                        </div>
                        <div className=" w-full flex flex-col items-start justify-center h-fit py-3 gap-1">
                            <label className='text-base font-extralight capitalize text-black ' >password</label>
                            <input value={password} onChange={ (e) => { setPassword(e.target.value); setErrorMsg("") }} type="password" className="w-full font-extralight  border border-[#9c9c9c] bg-[#fcfcfc] outline-none text-base rounded-[6px] p-2 " />
                        </div>
                    </div>
                    {/* {console.log(errorMsg)} */}
                    {
                        
                        errorMsg && <div className="w-full h-fit text-red-600  bg-transparent flex justify-center py-1">
                            <p className="">{errorMsg}</p>
                        </div>
                    }
                    {/* {console.log(errorMsg)} */}
                    <Link onClick={ handleSignup } type='submit' className="w-full h-fit flex justify-center  bg-[#4b49ac] text-white hover:text-[#4b49ac] hover:bg-white text-xl font-light border border-[#4b49ac]  transition ease-in duration-75 py-4 mt-3 rounded-[18px]">
                            <h4 className="capitalize">Signup</h4>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Signup
// bg-[#f3f3f3]