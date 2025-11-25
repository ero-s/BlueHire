import React from 'react'
import Hero from '../MainComponents/LandingComponents/Hero/Hero'
import About from '../MainComponents/LandingComponents/About/About'
import Team from '../MainComponents/LandingComponents/Team/Team'
import Contacts from '../MainComponents/LandingComponents/Contacts/Contacts'
import NavBarLanding from '../MainComponents/LandingComponents/NavBarLanding/NavBarLanding'
import Footer from '../Client/components/DashboardFooter'

const Landing: React.FC = () => {
  return (
    <div>
      <NavBarLanding/>
      <Hero />
      <About id="about"/>
      <Team />
      <Contacts />
      <Footer/>
    </div>
  );
};

export default Landing;
