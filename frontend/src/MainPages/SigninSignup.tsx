// import React from 'react'
// import Signup from '../MainComponents/LandingComponents/Signup/Signup'
import SignIn from '../MainComponents/LandingComponents/SignIn/SignIn';
// import Logo from '../MainComponents/LandingComponents/Logo/Logo';
import signupCard from "../MainComponents/LandingComponents/Assets/signup_img.png";

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