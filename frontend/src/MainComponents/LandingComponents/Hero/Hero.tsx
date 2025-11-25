import React from 'react'
import model from "../Assets/model.png"
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-bluehire-blue-dark w-full overflow-hidden font-sans">
      {/* Background Geometric Shapes */}
      <div className="absolute top-0 right-0 h-full w-full lg:w-[45%] bg-white" style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>
      <div className="absolute top-0 right-0 h-full w-full lg:w-[45%] bg-gray-200 opacity-50" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 5% 100%)' }}></div>
      <div className="absolute top-0 right-0 h-full w-full lg:w-[45%] bg-blue-300 opacity-60" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0% 100%)', transform: 'translateX(20%)' }}></div>


      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-screen pt-24 lg:pt-0">
          
          {/* Left Content */}
          <div className="lg:w-[55%] text-center lg:text-left mb-12 lg:mb-0 lg:ml-10 mt-20">
            <h1 className="font-gabarito text-5xl md:text-6xl lg:text-7xl font-black text-bluehire-blue lg:text-white leading-tight">
              Where <span className="text-bluehire-cyan">Skilled</span><br />
              <span>Hands Meet Real</span><br />
              <span className="text-bluehire-cyan">Opportunities</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl lg:text-gray-300 lg:text-left text-bluehire-dark text-center ml-20 max-w-2xl mx-auto lg:mx-0">
              BlueHire bridges the gap between skilled workers and clients who need their expertise. It ensures faster, simpler, and more reliable connections for every job. With BlueHire, finding the right match is effortless and trustworthy.
            </p>
            <Link
              to="/signup"
              className="mt-8 inline-block bg-bluehire-cyan text-bluehire-blue font-bold text-lg px-10 py-3 rounded-full shadow-lg border-2 border-white hover:bg-white transition-all duration-300 transform hover:scale-105"
            >
              Join Now!
            </Link>
          </div>

          {/* Right Image */}
          <div className="lg:w-[45%] flex items-end justify-center min-h-[20vh] md:min-h-[30vh]">
            <img
              src={model}
              alt="Skilled workers"
              className="w-[40%] max-w-3xl object-contain absolute bottom-0 lg:right-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;