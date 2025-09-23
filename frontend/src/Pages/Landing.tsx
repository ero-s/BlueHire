import React from 'react'
import Hero from '../Components/Hero/Hero'
import landingImage from "../Components/Assets/landingbg.png"

const Landing = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${landingImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 840vh", 
        backgroundPosition: "top center",
        minHeight: "100vh", 
        width: "100%",
      }}
    >
      <Hero />
    </div>
  )
}

export default Landing
