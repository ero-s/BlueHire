import React from 'react'
import logo from "../Assets/logo.png"
import "./Logo.css"

const Logo = () => {
  return (
    <div className="logo">
        <div className="logo-img">
            <img src={logo} alt="" />
        </div>
        <div className="name">
            <h1 className='signup-bluecolor'>Blue</h1>
            <h1 className='signup-hirecolor'>Hire</h1>
        </div>
    </div>
  )
}

export default Logo