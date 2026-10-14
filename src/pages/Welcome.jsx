import React from 'react'
import WelcomeNavbar from '../Components/WelcomeNavbar'
import HeroSection from '../Components/HeroSection'
import FeaturesSection from '../Components/FeaturesSection'
import BenefitsSection from '../Components/BenefitsSection'
import WelcomeFooter from '../Components/WelcomeFooter'




const Welcome = () => {
  


  return (
    <div className='w-full h-fit  flex flex-col justify-start '>
      <WelcomeNavbar />
      <div className="  w-full h-fit flex flex-col gap-10 bg-white ">
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <WelcomeFooter />
      </div>
    </div>
  )
}

export default Welcome
