import React from 'react'
import "../Hero/Hero.css"
import model from "../Assets/model.png"
import design from "../Assets/designbg.png"

const Hero = () => {
  return (
    <div className="hero">
        <div className="hero-left">
          <div className="hero-msg">
            <div className="first-msg">
              <h1>Where</h1>
              <h1 className='skilled-msg'>Skilled</h1>
            </div>
            <h1>Hands Meet Real</h1>
            <h1 className='opportunities-msg'>Opportunities</h1>
          </div>
            <p>BlueHire bridges the gap between skilled workers and clients who need their expertise. It ensures faster, simpler, and more reliable connections for every job. With BlueHire, finding the right match is effortless and trustworthy.</p>
            
            <button className="joinnow-btn">Join Now!</button>
        </div>
        <div className="hero-right">
          <img src={design} alt="Blue Background Design" className="design" />
          <img src={model} alt="Landing Model" className="model"/>
        </div>
    </div>
  )
}

export default Hero