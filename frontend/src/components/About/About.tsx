import React from 'react'
import "./About.css"
import model2 from "../Assets/model2.png"

const About = () => {
  return (
    <div>
        <div className="about">
            <div className="about-upper">
                <div className="about-upperleft">
                    <p className="about-text">About</p>
                    <div className="about-name">
                        <h1 className="about-blue">Blue</h1>
                        <h1 className="about-hire">Hire</h1>
                    </div>
                </div>
                <div className="about-upperright">
                    <p>Connecting</p>
                    <p>Clients and</p> 
                    <p>Workers with</p> 
                    <p>Trust</p>
                </div>
            </div>
            <div className="about-lower">
                <div className="about-lowerleft">
                    <p>BlueHire is a trusted digital <br />  platform that connects <br /> clients with verified local <br /> workers. It helps clients <br /> easily find reliable service <br /> providers while giving <br /> workers more opportunities <br /> to showcase their skills and <br /> earn fairly.</p>
                </div>
                <div className="background"></div>
                <div className="model2-img">
                    <img src={model2} alt="Carpenter Guy Model" />
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default About