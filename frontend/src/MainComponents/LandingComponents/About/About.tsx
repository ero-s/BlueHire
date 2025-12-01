import React from 'react'
import model2 from "../Assets/model2.png"
import vision from "../Assets/vision.png"
import corevalues from "../Assets/corevalues.png"

interface AboutProps {
  id?: string;
}

const About: React.FC<AboutProps> = ({ id = "about" }) => {
  return (
    <section
      id={id}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-bluehire-form-bg via-white to-bluehire-cyan/10"
    >
{/* ---------- Decorative Background ---------- */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    
    <div className="absolute top-[-5%] left-[10%] w-[200px] h-[200px] bg-bluehire-cyan/30 rounded-full blur-2xl"></div>

    <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-bluehire-blue/20 rounded-full blur-3xl"></div>

    <div className="absolute top-[5%] right-[-10%] w-[350px] h-[200px] bg-bluehire-bluer/25 rounded-full blur-2xl"></div>

    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-bluehire-cyan/15 rotate-12 blur-xl"
      style={{ clipPath: "polygon(0 0, 100% 20%, 80% 100%, 0 100%)" }}
    ></div>

    <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-bluehire-cyan/25 rounded-full blur-3xl"></div>

    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-gradient-to-r from-bluehire-cyan/15 via-bluehire-blue/10 to-transparent blur-2xl rounded-full"></div>

    <div
      className="absolute bottom-0 right-0 w-[65%] h-[80%] bg-bluehire-blue-dark/70"
      style={{
        clipPath: "polygon(35% 0, 100% 0, 100% 100%, 0 100%)",
      }}
    ></div>

    <div
      className="absolute bottom-0 right-0 w-[60%] h-[75%] bg-bluehire-blue/30"
      style={{
        clipPath: "polygon(45% 0, 100% 0, 100% 100%, 10% 100%)",
      }}
    ></div>

  {/* Floating blurred glow (Center-Right) */}
  <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-bluehire-cyan/25 rounded-full blur-2xl animate-pulse"></div>

  {/* Light background transition under Mission & Vision */}
  <div className="absolute bottom-0 left-0 w-full h-[55%] bg-gradient-to-t from-bluehire-form-bg/80 via-white/90 to-transparent"></div>
</div>


      {/* ---------- Main Content ---------- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative lg:ml-16">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* About Header */}
            <div className="bg-gray-100 shadow-md rounded-full lg:py-14 lg:px-24 py-6 px-16 flex items-center gap-4 z-10">
              <h2 className="lg:text-5xl md:text-5xl text-4xl font-gabarito text-gray-500">About</h2>
              <div className="font-gabarito font-bold lg:text-6xl md:text-6xl text-5xl">
                <span className='text-blue-700'>Blue</span>
                <span className='text-gray-700'>Hire</span>
              </div>
            </div>

            {/* Top Right Text */}
            <div className="mt-6 lg:mt-0 text-center lg:text-right">
              <p className="lg:text-5xl md:text-4xl text-3xl font-gabarito font-bold text-bluehire-dark leading-tight text-center md:mt-4 lg:mr-24 lg:-mt-12">
                Connecting Clients and <br /> Workers with Trust.
              </p>
            </div>
          </div>

          {/* Main Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-12 mt-12">
            <p className="lg:w-1/2 lg:text-2xl lg:text-justify lg:ml-0 text-xl text-center text-gray-600 space-y-4 z-20 lg:-mt-24 lg:pr-24 px-6 font-medium lg:leading-loose">
              BlueHire is a trusted digital platform that connects clients with verified local workers. It helps clients easily find reliable service providers while giving workers more opportunities to showcase their skills and earn fairly.
            </p>
            <div className="lg:w-1/2 flex justify-center lg:-mt-10">
              <div className="relative">
                <div className="absolute -inset-2 bg-bluehire-cyan/30 rounded-2xl transform -rotate-2"></div>
                <img
                  src={model2}
                  alt="Carpenter"
                  className="relative rounded-2xl shadow-2xl w-full h-auto lg:max-w-sm object-cover max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="text-center mt-20 md:mt-28 relative z-10">
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-gabarito font-bold text-bluehire-bluer">
            <span className="text-gray-300 italic">Our</span> Mission
          </h3>
          <p className="mt-8 max-w-4xl lg:mx-auto text-lg text-gray-600 text-center font-medium lg:leading-loose">
            To provide a reliable platform where clients can find skilled, verified workers quickly and securely, while empowering workers with more opportunities.
          </p>
        </div>

        {/* Vision & Core Values */}
        <div className="grid md:grid-cols-2 gap-10 mt-16 md:mt-24 px-24 relative z-10">
          <div className="flex justify-center">
            <img
              src={vision}
              alt="Vision"
              className="w-full max-w-lg mx-auto rounded-3xl transition-transform duration-300 transform hover:scale-105"
            />
          </div>

          <div className="flex justify-center">
            <img
              src={corevalues}
              alt="Core Values"
              className="w-full max-w-lg mx-auto rounded-3xl transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
