import React from 'react'
import Signup from '../components/LandingComponents/Signup/Signup'
import SignIn from '../components/LandingComponents/SignIn/SignIn';
import Logo from '../components/LandingComponents/Logo/Logo';
import signupCard from "../components/LandingComponents/Assets/signup_card.png";

const SigninSignup = () => {
  return (
    <div 
        style={{
          backgroundImage: `url(${signupCard})`,
          backgroundSize: "cover",
          backgroundPosition: "center",  
          display: "flex",       
          justifyContent: "center",  
          alignItems: "center",      
          minHeight: "100vh",
          overflow: "hidden"
      }}
    >
        <SignIn/>
    </div>
  )
}

export default SigninSignup