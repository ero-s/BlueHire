import React from 'react'
import Hero from '../components/LandingComponents/Hero/Hero'
import About from '../components/LandingComponents/About/About'
import Team from '../components/LandingComponents/Team/Team'
import Contacts from '../components/LandingComponents/Contacts/Contacts'
import NavBarLanding from '../components/LandingComponents/NavBarLanding/NavBarLanding'
import Footer from '../components/ClientSideDashboard/Dashboard/Footer'

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
