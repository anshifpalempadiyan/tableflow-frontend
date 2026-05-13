import React from 'react'
import BlueButton from './BlueButton'
import WhiteButton from './WhiteButton'

const HeroSection = () => {
    return (
        <div className="w-full h-fit  bg-white bg-gradient-to-br from-primary/15   via-white to-accent/15">
            <div className=" container mx-auto w-full h-fit flex flex-col lg:flex-row gap-4 flex-wrap py-12">


                <div className="flex-1  flex flex-col items-center lg:items-start justify-center gap-5 ">
                    <h1 className="text-black text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-left  ">Manage Your Restaurant Floor <br className='lg:block hidden' /><span className="text-primary">Like Never Before</span></h1>
                    <p className="text-lg text-muted-foreground ">Smart table management, real-time reservations, and efficient seating — all in one platform. Transform the way you run your restaurant.</p>
                    <div className="w-full flex flex-row justify-start items-center gap-4">
                        <BlueButton text={"start managing your floor"} path={"/signup"} height={"h-12"} width={"px-4 sm:px-8"} textSize={"text-sm sm:text-base"} />
                        <WhiteButton text={"learn more"} path={"/#features"} height={"h-12"} width={"px-4 sm:px-8"} textSize={"text-sm sm:text-base"} />

                    </div>
                </div>
                <div className="hidden lg:flex flex-col flex-1 h-fit bg-white rounded-2xl shadow-2xl p-6 border ">
                    <div className="w-full h-fit  grid grid-cols-4 gap-3">
                        {

                            Array.from({ length: 16 }).map((_, i) => {
                                return (
                                    <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${[0, 5, 10, 15].includes(i) ? "bg-occupied text-white" : [2, 7].includes(i) ? "bg-reserved text-white" : [11].includes(i) ? "bg-disabled text-muted-foreground" : "bg-available text-white"} `}>T{i + 1}</div>

                                )
                            })


                        }

                    </div>
                    <div className="mt-4 flex flex-row gap-4 ">
                        <div className="flex flex-row justify-start items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-available rounded-[50%]"></div>
                            <p className="capitalize text-base text-muted-foreground ">available</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-occupied rounded-[50%]"></div>
                            <p className="capitalize text-base text-muted-foreground ">occupaied</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-reserved rounded-[50%]"></div>
                            <p className="capitalize text-base text-muted-foreground ">reserved</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HeroSection
