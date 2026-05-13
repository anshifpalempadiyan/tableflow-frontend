import { Icon } from '@iconify/react'
import React from 'react'
import { Link } from 'react-router-dom'

const BenefitsSection = () => {
    const benefits = [
    {
      icon : "lucide:zap",
      heading : "Manage with 1 Click",
      text : "Intuitive controls"
    },
    {
      icon : "charm:refresh",
      heading : "Real-time Updates",
      text : "Always in sync"
    },
    {
      icon : "lucide:graduation-cap",
      heading : "Zero Training Needed",
      text : "Easy to use"
    },
  ]

    return (
        <div className="w-full h-fit bg-secondary py-10">
            <div className="w-full h-fit container mx-auto  flex flex-col items-center justify-center gap-10">
                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">Why Choose TableFlow?</h3>
                <div className="w-full container mx-auto flex flex-col sm:flex-row gap-14 sm:gap-8 justify-start sm:justify-evenly items-center ">
                    {
                        benefits.map((item, index) => {
                            return (
                                <div className="flex flex-col items-center justify-start">
                                    <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full ">
                                        <Icon icon={item.icon} className='w-8 h-8 text-primary ' />
                                    </div>
                                    <h4 className="font-semibold text-lg text-center">{item.heading}</h4>
                                    <p className="text-sm text-muted-foreground">{item.text}</p>
                                </div>
                            )
                        })
                    }


                </div>
                <div className="w-full h-fit flex justify-center items-center">
                    <Link to={"/signup"} className='text-base text-white h-12 px-8 bg-primary hover:bg-opacity-85 rounded-lg flex justify-center items-center'>
                        <span className="">Get Started Free</span>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default BenefitsSection
