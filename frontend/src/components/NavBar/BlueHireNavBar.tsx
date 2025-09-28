import React from 'react';
import './BlueHireNavbar.css';
import logo from "../Assets/logo.png";
import mailIcon from '../Assets/bell.svg';          
import bellIcon from '../Assets/mail.svg';          
import profilePic from '../Assets/johnny.png'; 

const BlueHireNavbar: React.FC = () => {
    return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="BlueHire Logo" className="navbar-logo" />
        <span className="navbar-title">
          <span className="navbar-title-blue">Blue</span>
          <span className="navbar-title-hire">Hire</span>
        </span>
      </div>
      <div className="navbar-menu">
        <a href="#" className="navbar-menu-item">Dashboard</a>
        <a href="#" className="navbar-menu-item">Posts</a>
        <a href="#" className="navbar-menu-item">Settings</a>
        <a href="#" className="navbar-menu-item">Transactions</a>
      </div>
      <div className="navbar-actions">
        <div className="navbar-icon">
          <img src={bellIcon} alt="Notifications" />
        </div>
        <div className="navbar-icon">
          <img src={mailIcon} alt="Mail" />
        </div>
        <div className="navbar-profile">
          <img src={profilePic} alt="Jose P. Rizal" className="navbar-profile-pic" />
          <div className="navbar-profile-info">
            <span className="navbar-profile-name">Jose P. Rizal</span>
            <span className="navbar-profile-role">Janitor</span>
          </div>
          <span className="navbar-profile-caret">&#9660;</span>
        </div>
      </div>
    </nav>
  );
};

export default BlueHireNavbar;