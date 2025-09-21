import React from 'react'
import Signup from '../Components/Signup/Signup'
import signupCard from "../Components/Assets/signup_card.png";

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
    </div>
  )
}

export default LoginSignup