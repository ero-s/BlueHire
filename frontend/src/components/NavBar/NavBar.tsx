import "./NavBar.css";
import BlueHireLogo from "../../assets/BlueHireLogo.png";
import ProfilePic from "../../assets/profile.png";
import { MessageSquare, Bell } from "lucide-react";

function NavBar() {
  return (
    <nav className="navbar">
    {/* Left Section: Logo + Company Name */}
    <div className="navbar-logo">
        <img src={BlueHireLogo} alt="BlueHire Logo" className="logo-img" />
        <span className="company-name">
        <span style={{ color: "#4D7EAF", fontWeight: "bold" }}>Blue</span>
        <span style={{ color: "#525252", fontWeight: "bold" }}>Hire</span>
        </span>
    </div>

    {/* Middle Section: Nav Links */}
    <ul className="navbar-links">
        <li>Dashboard</li>
        <li>Post</li>
        <li>Settings</li>
        <li>Help & Support</li>
    </ul>

    {/* Right Section: Icons + Profile */}
    <div className="navbar-right">
        <button className="icon-btn">
            <MessageSquare size={24} strokeWidth={1.8} />
        </button>
        <button className="icon-btn">
            <Bell size={24} strokeWidth={1.8} />
        </button>

        {/* Profile Component */}
        <div className="profile">
        <img src={ProfilePic} alt="Profile Pic" className="profile-pic" />
        <div className="profile-info">
            <div className="profile-name">John Doe</div>
            <div className="profile-position">Software Engineer</div>
        </div>
        </div>
    </div>
    </nav>
  );
}

export default NavBar;
