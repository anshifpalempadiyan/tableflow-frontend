import React from 'react'
import Logo from './Logo'
import BlueButton from './BlueButton'
import WhiteButton from './WhiteButton'

const WelcomeNavbar = () => {
  return (
    <header  className=" sticky top-0 z-50 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
          <div className=" container mx-auto w-full h-[70px] flex flex-row justify-between items-center ">
            <Logo />
            <div className="w-fit flex flex-row gap-3">
                <WhiteButton text={"Login"} path={"/login"} />
                <BlueButton text={"Sign Up"} path={"/signup"} />
            </div>

          </div>
        </header>
  )
}

export default WelcomeNavbar
