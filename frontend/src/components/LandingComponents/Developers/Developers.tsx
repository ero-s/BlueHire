import React from "react";
import "./Developers.css";
import ig_icon from "../Assets/ig_icon.png";
import fb_icon from "../Assets/fb_icon.png";
import tel_icon from "../Assets/tel_icon.png";

interface DeveloperCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  gradient: string;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  role,
  image,
  bio,
  gradient,
}) => {
  return (
    <div
      className="developer-profile"
      style={{ background: gradient }}
    >
      <h1>{name}</h1>
      <div className="developer-role">
        <p>{role}</p>
      </div>
      <img src={image} alt={`Developer ${name}`} className="developer-pic"/>

      <div className="developer-bio">
        <p>{bio}</p>
      </div>

      <div className="developer-contacts">
        <img src={ig_icon} alt="Instagram Icon" />
        <img src={fb_icon} alt="Facebook Icon" />
        <img src={tel_icon} alt="Telephone Icon" />
      </div>
    </div>
  );
};

export default DeveloperCard;
