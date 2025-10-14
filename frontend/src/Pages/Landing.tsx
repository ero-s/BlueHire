import React from 'react'
import Hero from '../components/Hero/Hero'
import landingImage from "../components/Assets/landingbg.png"
import About from '../components/About/About'
import Team from '../components/Team/Team'
import Contacts from '../components/Contacts/Contacts'

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
      <Contacts />
    </div>
  )
}

export default Landing
