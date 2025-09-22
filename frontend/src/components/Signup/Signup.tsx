import React from 'react'
import { useState } from 'react'
import './Signup.css'
import logo from '../Assets/logo.png'
import Logo from '../Logo/Logo'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState<File | null>(null);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        console.log("Submitted: ", {username})
    }


  return (
    <div className='signup'>
        <div className="signup-left">
            <Logo/>
            <div className="welcome-message">
                <h1>Welcome!</h1>
                <p>
                    Create your BlueHire account to start connecting with opportunities that match your needs. Fill in the required details to complete your registration.
                </p>
            </div>
            
        </div>

        <div className="signup-right">
            <h1>Create An Account</h1>

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

                <div className="field">
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="worker">Worker</option>
                        <option value="client">Client</option>
                    </select>
                </div>

                <div className="field">
                    <label>Government ID</label>
                    <input
                        type="file"
                        id="govId"
                        accept="image/*"
                        onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImage(e.target.files[0]);
                            console.log("Selected file:", e.target.files[0]);
                        }
                        }}
                        style={{ display: "none" }}  
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('govId')?.click()}
                        className="upload-btn"
                    >
                        Upload File
                    </button>
                    <span id="fileName"></span>
                    </div>
            </form>    

            <button className='register-btn'>Register</button>
        </div>
    </div>
  )
}

export default Signup