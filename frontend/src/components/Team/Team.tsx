import React from 'react'
import Developers from '../Developers/Developers'   
import sherielyn_img from '../Assets/sherielyn.png'
import '../Developers/Developers.css'
import './Team.css'

const Team = () => {
  return (
    <div>
        <div className="team">
            <h1 className='meet'>Meet The Team</h1>
            <div className="developers">
                <div className="developer1">
                    <Developers  
                            name="Sherielyn Guadiana"
                            role="BSCS 3 - F2"
                            image={sherielyn_img}
                            bio="Innovative coder who loves turning ideas into intuitive digital experiences"
                            gradient="linear-gradient(to bottom, #8bbae4ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer2">
                    <Developers  
                            name="Raziff Gumapon"
                            role="BSCS 3 - F2"
                            image={sherielyn_img}
                            bio="Innovative coder who loves turning ideas into intuitive digital experiences"
                            gradient="linear-gradient(to bottom, #aabdd1ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer3">
                    <Developers  
                            name="Austine Lomocso"
                            role="BSCS 3 - F2"
                            image={sherielyn_img}
                            bio="Innovative coder who loves turning ideas into intuitive digital experiences"
                            gradient="linear-gradient(to bottom, #8bbae4ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer4">
                    <Developers  
                            name="Kyle Plando"
                            role="BSCS 3 - F2"
                            image={sherielyn_img}
                            bio="Innovative coder who loves turning ideas into intuitive digital experiences"
                            gradient="linear-gradient(to bottom, #aabdd1ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
                <div className="developer5">
                    <Developers  
                            name="Shervin Tabernero"
                            role="BSCS 3 - F2"
                            image={sherielyn_img}
                            bio="Innovative coder who loves turning ideas into intuitive digital experiences"
                            gradient="linear-gradient(to bottom, #8bbae4ff 42%, rgb(235, 235, 235) 42%)"
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Team