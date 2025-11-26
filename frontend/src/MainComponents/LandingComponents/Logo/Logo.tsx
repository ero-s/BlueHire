import React from 'react';
import logo from "../Assets/logo.png";

interface LogoProps {
  variant?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'md' }) => {
  const sizeClasses = {
    sm: { img: 'h-6', text: 'text-lg' },
    md: { img: 'h-8', text: 'text-2xl' },
    lg: { img: 'h-10', text: 'text-3xl' },
  };

  const selectedSize = sizeClasses[variant];

  return (
    <div className="flex items-center gap-3">
      <img src={logo} alt="BlueHire Logo" className={`${selectedSize.img} rounded-full`} />
      <div className={`font-bold font-sans ${selectedSize.text}`}>
        <span className='text-[#4D7EAF]'>Blue</span>
        <span className='text-gray-700'>Hire</span>
      </div>
    </div>
  );
};

export default Logo;

