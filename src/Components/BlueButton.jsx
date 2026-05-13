import React from 'react'
import { Link } from 'react-router'

const BlueButton = ({ text , path , height , width , textSize }) => {
    return (

        <Link to={ path } className={` ${ height ? height : "py-1" } ${ width ? width : "px-4"} flex justify-center items-center  rounded-lg shadow-sm hover:bg-opacity-85 bg-primary`}>
            <span className={` ${ textSize ? textSize : "text-sm"} text-white font-light capitalize `}>{text}</span>
        </Link>


    )
}

export default BlueButton
// border border-gray-200