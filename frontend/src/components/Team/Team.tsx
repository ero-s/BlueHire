import React from 'react'
import Developers from '../Developers/Developers'   
import sherielyn_img from '../Assets/sherielyn_img.jpg'
import austine_img from '../Assets/austine_img.png'
import raziff_img from '../Assets/raziff_img.png'
import shervin_img from '../Assets/shervin_img.png'
import '../Developers/Developers.css'
import './Team.css'

const Team = () => {
  return (
    <div>
        <div className="team">
            <h1 className='meet'>Meet Our Team</h1>
            <div className="developers">
                <div className="developer1">
                    <Developers  
                            name="Sherielyn Guadiana"
                            role="BSCS 3 - F2"
                            image={sherielyn_img}
                            bio="Results-driven developer with a creative mindset, committed to excellence and continuous learning."
                            gradient="linear-gradient(to bottom, #8bbae4ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer2">
                    <Developers  
                            name="Raziff Gumapon"
                            role="BSCS 3 - F2"
                            image={raziff_img}
                            bio="Analytical thinker skilled in algorithms and software development with strong problem-solving abilities."
                            gradient="linear-gradient(to bottom, #aabdd1ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer3">
                    <Developers  
                            name="Austine Lomocso"
                            role="BSCS 3 - F2"
                            image={austine_img}
                            bio="Goal driven developer with a keen eye for detail, values functional efficiency for effective systems."
                            gradient="linear-gradient(to bottom, #8bbae4ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer4">
                    <Developers  
                            name="Kyle Plando"
                            role="BSCS 3 - F2"
                            image={sherielyn_img}
                            bio="Detail-oriented developer with expertise in database design and optimizing data-driven applications."
                            gradient="linear-gradient(to bottom, #aabdd1ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer5">
                    <Developers  
                            name="Shervin Tabernero"
                            role="BSCS 3 - F2"
                            image={shervin_img}
                            bio="Dedicated developer with strong foundation, blending creativity and precision for impactful projects."
                            gradient="linear-gradient(to bottom, #8bbae4ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Team