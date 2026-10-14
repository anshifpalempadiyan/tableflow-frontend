import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const WelcomeFooter = () => {
    const footerData = [
        {
            heading: "Product",
            data: [
                {
                    text: "Features",
                    path: ""
                },
                {
                    text: "Pricing",
                    path: ""
                },
                {
                    text: "Documentation",
                    path: ""
                },
                {
                    text: "API",
                    path: ""
                },
            ]
        },
        {
            heading: "Company",
            data: [
                {
                    text: "About",
                    path: ""
                },
                {
                    text: "Blog",
                    path: ""
                },
                {
                    text: "Careers",
                    path: ""
                },
                {
                    text: "Contact",
                    path: ""
                },
            ]
        },
        {
            heading: "Legal",
            data: [
                {
                    text: "Privacy Policy",
                    path: ""
                },
                {
                    text: "Terms of Service",
                    path: ""
                },
                {
                    text: "Cookie Policy",
                    path: ""
                },

            ]
        },

    ]
    return (
        <div className="w-full h-fit  bg-white bg-gradient-to-br from-primary/15   via-white to-accent/15">
            <div className="container mx-auto w-full h-fit flex flex-col md:flex-row items-start justify-start gap-9 px-4 py-8 lg:py-12 lg:px-8">
                <div className="basis-1/3 h-full flex flex-col items-start justify-center gap-4">
                    <Logo />
                    <p className="test-sm text-muted-foreground max-w-xs">Smart restaurant floor management for modern dining establishments.</p>
                </div>
                <div className="w-full md:basis-2/3 h-full flex flex-row flex-wrap justify-between md:justify-evenly items-start gap-6 ">
                    {
                        footerData.map((section, index) => {
                            return (
                                <div key={index} className=" flex flex-col items-start justify-start gap-4">
                                    <h6 className="text-lg font-semibold text-black  ">{section.heading}</h6>
                                    <div className="flex flex-col gap-2 items-start justify-start">
                                        {
                                            section.data.map((item, index) => {
                                                return (
                                                    <Link to={item.path} key={index}> <p className="text-muted-foreground hover:text-primary hover:underline text-sm">{item.text}</p> </Link>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default WelcomeFooter
