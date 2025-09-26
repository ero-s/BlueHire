import React from 'react'
import Hero from '../Components/Hero/Hero'
import landingImage from "../Components/Assets/landingbg.png"
import About from '../Components/About/About'
import Team from '../Components/Team/Team'

const Landing = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${landingImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 840vh", 
        backgroundPosition: "top center",
        minHeight: "600vh", 
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <Hero />
      <About />
      <Team />
    </div>
  )
}

export default Landing
