import "./NavBar.css";
import BlueHireLogo from "../../assets/BlueHireLogo.png";
import ProfilePic from "../../assets/profile.png";
import { MessageSquare, Bell } from "lucide-react";

function NavBar() {
  return (
    <nav className="navbar">
    {/* Left Section: Logo + Company Name */}
    <div className="navbar-logo">
        <img src={BlueHireLogo} alt="BlueHire Logo" className="logo-img" />
        <span className="company-name">
        <span style={{ color: "#4D7EAF", fontWeight: "bold" }}>Blue</span>
        <span style={{ color: "#525252", fontWeight: "bold" }}>Hire</span>
        </span>
    </div>

    {/* Middle Section: Nav Links */}
    <ul className="navbar-links">
        <li>Dashboard</li>
        <li>Post</li>
        <li>Settings</li>
        <li>Help & Support</li>
    </ul>

    {/* Right Section: Icons + Profile */}
    <div className="navbar-right">
        <button className="icon-btn">
            <MessageSquare size={24} strokeWidth={1.8} />
        </button>
        <button className="icon-btn">
            <Bell size={24} strokeWidth={1.8} />
        </button>

        {/* Profile Component */}
        <div className="profile">
        <img src={ProfilePic} alt="Profile Pic" className="profile-pic" />
        <div className="profile-info">
            <div className="profile-name">John Doe</div>
            <div className="profile-position">Software Engineer</div>
        </div>
        </div>
    </div>
    </nav>
  );
}

export default NavBar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Logo from '../Logo/Logo';

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Logo size={25} textSize={20}/> 
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("home")}>
          <Link style={{ textDecoration: 'none', color: '#162339' }} to='/'>Home</Link>
          {menu === "home" && <hr />}
        </li>
        <li onClick={() => setMenu("about")}>
          <Link style={{ textDecoration: 'none', color: '#162339' }} to='/home'>About</Link>
          {menu === "about" && <hr />}
        </li>
        <li onClick={() => setMenu("contact")}>
          <Link style={{ textDecoration: 'none', color: '#162339' }} to='/contact'>Contact</Link>
          {menu === "contact" && <hr />}
        </li>
        <li onClick={() => setMenu("signin")}>
          <Link style={{ textDecoration: 'none', color: '#162339'}} to='/signin'>Sign In</Link>
          {menu === "signin" && <hr />}
        </li>
      </ul>
      <Link to='/login' className='nav-signup-btn'>
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

export default Navbar;
