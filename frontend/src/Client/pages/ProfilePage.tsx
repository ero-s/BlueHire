import React, { useState } from "react";
import Header from "../components/DashboardHeader";
import Footer from "../components/DashboardFooter";
import { LuShieldCheck, LuCamera } from "react-icons/lu";
import "../assets/css/ProfilePage.css";
import logo from "../../MainAssets/images/BlueHireLogo.png";

const ProfilePage: React.FC = () => {
  // Placeholder data - replace with actual user data from props/context/API
  const [userData, setUserData] = useState({
    profileImg: "https://i.pravatar.cc/150?u=juan_delacruz",
    userName: "Juan Dela Cruz",
    birthday: "January 7, 1995",
    age: 30,
    address:
      "123 Mango Avenue, Brgy. Poblacion, Cebu City, Cebu, 6000, Philippines",
    email: "juan.delacruz@gmail.com",
    phone: "+6399874037085",
    bio: "CEO of Dale Inc. a fast-growing software company specializing in AI-driven business solutions. Juan has over 15 years of leadership experience in technology and innovation. Is passionate about building organizations, streamline operations and achieve sustainable growth. He believes in empowering people through creativity and building solutions that shape the future of work.",
    isVerified: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would dispatch an action to save the data
    alert("Profile information saved successfully!");
  };

  return (
    <div className="profile-page-container">
      <Header logo={logo}
      userName="Shervin" />

      <main className="profile-main-content">
        <div className="profile-top-bar">
          <h1 className="profile-page-title">Manage Account</h1>
        </div>

        <div className="profile-content-grid">
          {/* Left Column: Profile Card */}
          <div className="profile-card profile-info-card">
            <div className="profile-avatar-wrapper">
              <img
                src={userData.profileImg}
                alt="User Profile"
                className="profile-avatar"
              />
              <button className="edit-avatar-btn" aria-label="Edit avatar">
                <LuCamera size={18} />
              </button>
            </div>
            <h2 className="profile-name">{userData.userName}</h2>
            {userData.isVerified && (
              <div className="profile-verified">
                <LuShieldCheck size={18} /> Verified
              </div>
            )}
            <div className="profile-bio-section">
              <h3>Bio:</h3>
              <p>{userData.bio}</p>
            </div>
          </div>

          {/* Right Column: Forms */}
          <div className="profile-forms-column">
            {/* Basic Information */}
            <div className="profile-card profile-form-card">
              <h3 className="form-section-title">Basic Information</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="userName">NAME</label>
                    <input
                      type="text"
                      id="userName"
                      value={userData.userName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="birthday">BIRTHDAY</label>
                    <input
                      type="text"
                      id="birthday"
                      value={userData.birthday}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">AGE</label>
                    <input type="text" id="age" value={userData.age} readOnly />
                  </div>
                  <div className="form-group full-width">
                    <label htmlFor="address">ADDRESS</label>
                    <textarea
                      id="address"
                      rows={2}
                      value={userData.address}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">EMAIL</label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">PHONE</label>
                    <input
                      type="tel"
                      id="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button type="submit" className="save-changes-btn">
                  Save Changes
                </button>
              </form>
            </div>

            {/* Client-Specific Information */}
            <div className="profile-card profile-form-card">
              <h3 className="form-section-title">
                Client-Specific Information
              </h3>
              <div className="form-grid-2-col">
                <div className="form-group">
                  <label htmlFor="companyName">COMPANY NAME</label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="e.g. Dale Inc."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">ROLE</label>
                  <input type="text" id="role" placeholder="e.g. CEO" />
                </div>
              </div>
            </div>

            {/* Payment Preferences */}
            <div className="profile-card profile-form-card">
              <h3 className="form-section-title">Payment Preferences</h3>
              <div className="payment-pref-grid">
                <div className="payment-placeholder"></div>
                <div className="payment-placeholder"></div>
                <div className="payment-placeholder"></div>
                <div className="payment-placeholder"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
