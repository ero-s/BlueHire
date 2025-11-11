import React from 'react'
import Developers from '../Developers/Developers'   
import sherielyn_img from '../Assets/sherielyn_img.jpg'
import austine_img from '../Assets/austine_img.png'
import raziff_img from '../Assets/raziff_img.png'
import shervin_img from '../Assets/shervin_img.png'
import kyle_img from '../Assets/kyle_img.jpg'
import team_bg from "../Assets/team_bg.jpg"

const developers = [
  {
    name: "Sherielyn Guadiana",
    role: "BSCS 3 - F2",
    image: sherielyn_img,
    bio: "Results-driven and innovative developer with a creative mindset, committed to excellence and continuous learning.",
    variant: 'primary',
  },
  {
    name: "Raziff Gumapon",
    role: "BSCS 3 - F2",
    image: raziff_img,
    bio: "Analytical thinker skilled in algorithms and software development with strong problem-solving abilities.",
    variant: 'secondary',
  },
  {
    name: "Austine Lomocso",
    role: "BSCS 3 - F2",
    image: austine_img,
    bio: "Goal-driven developer with a keen eye for detail, values functional efficiency for effective systems.",
    variant: 'primary',
  },
  {
    name: "Kyle Plando",
    role: "BSCS 3 - F2",
    image: kyle_img,
    bio: "Detail-oriented developer with expertise in database design and optimizing data-driven applications.",
    variant: 'secondary',
  },
  {
    name: "Shervin Tabernero",
    role: "BSCS 3 - F2",
    image: shervin_img,
    bio: "Dedicated developer with strong foundation, blending creativity and precision for impactful projects.",
    variant: 'primary',
  },
];

const Team: React.FC = () => {
  return (
    <section id="team" className="py-16 md:py-24 relative overflow-hidden">

      {/* Background Image + Gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              #dff3ffff,
              rgba(71, 149, 222, 0.62),
              rgba(26, 93, 156, 0.51),
              rgba(18, 77, 132, 0.1),
              #ffffffff
            ),
            url(${team_bg})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="absolute inset-0 -z-10 bg-bluehire-form-bg/40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-gabarito font-bold text-white drop-shadow-lg mt-12">
            Meet Our Team
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-10">
          {developers.map((dev, index) => (
            <Developers
              key={index}
              name={dev.name}
              role={dev.role}
              image={dev.image}
              bio={dev.bio}
              variant={dev.variant as 'primary' | 'secondary'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
