import React from 'react'
// import { Link } from 'react-router'
import { HashLink } from 'react-router-hash-link';


const WhiteButton = ({ text , path , height , width , textSize }) => {
  return (

    <HashLink smooth to={path} className={` ${ height ? height : "py-1" } ${ width ? width : "px-4"} flex justify-center items-center  border border-gray-200 rounded-lg shadow-sm bg-white hover:bg-primary hover:text-white text-black transition duration-200 ease-in-out`} >
      <span className={` ${ textSize ? textSize : "text-sm"}  capitalize text-sm font-light`}>{text}</span>
    </HashLink>


  )
}

export default WhiteButton
