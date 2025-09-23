import React from 'react';
import logo from "../Assets/logo.png";
import "./Logo.css";

interface LogoProps {
  size?: number;     
  textSize?: number; 
}

const Logo: React.FC<LogoProps> = ({ size = 35, textSize = 15 }) => {
  return (
    <div className="logo" style={{ gap: '12px', fontSize: `${textSize}px` }}>
      <img src={logo} alt="BlueHire Logo" style={{ height: `${size}px` }} />
      <div className="name">
        <span className='signup-bluecolor'>Blue</span>
        <span className='signup-hirecolor'>Hire</span>
      </div>
    </div>
  );
};

export default Logo;
