import React, { useState } from 'react'
import Logo from '../Logo/Logo'
import "../SignIn/SignIn.css"

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    console.log("Submitted: ", {username})
  }

  return (
    <div className="signin">
        <Logo/>
        <div className="signin-name">Sign In</div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>

        <button className='signin-btn'>Sign In</button>
    </div>
  )
}

export default SignIn