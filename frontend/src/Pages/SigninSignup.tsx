import React from 'react'
import Signup from '../components/LandingComponents/Signup/Signup'
import Login from '../components/LandingComponents/SignIn/SignIn';
import Logo from '../components/LandingComponents/Logo/Logo';
import signupCard from "../Components/Assets/signup_card.png";
import SignIn from '../components/LandingComponents/SignIn/SignIn';

const LoginSignup = () => {
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
        <Signup/>
        {/* <SignIn/> */}
    </div>
  )
}

export default LoginSignup