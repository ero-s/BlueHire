import React from 'react'
import Hero from '../Components/Hero/Hero'
import landingImage from "../Components/Assets/landingbg.png"
import About from '../Components/About/About'

const Landing = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${landingImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 840vh", 
        backgroundPosition: "top center",
        minHeight: "500vh", 
        width: "100%",
        overflowX: "hidden"
      }}
    >
      <Hero />
      <About />
    </div>
  )
}

export default Landing
