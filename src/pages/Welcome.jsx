import React from 'react'
import WelcomeNavbar from '../Components/WelcomeNavbar'
import HeroSection from '../Components/HeroSection'
// import { Icon } from '@iconify/react'
import FeaturesSection from '../Components/FeaturesSection'
// import { Link } from 'react-router-dom'
import BenefitsSection from '../Components/BenefitsSection'




const Welcome = () => {
  

  return (
    <div className='w-full h-fit  flex flex-col justify-start '>
      <WelcomeNavbar />
      <div className="  w-full h-fit flex flex-col gap-10 bg-white ">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
      </div>
    </div>
  )
}

export default Welcome
