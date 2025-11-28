import React, { useState } from "react";
import Footer from "../components/ClientFooter";
import { ShieldCheck, Camera, Pencil, CheckCircle2 } from "lucide-react";
import Header from "../components/ClientHeader";

const ClientProfilePage: React.FC = () => {
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
    companyName: "Dale Inc.",
    role: "CEO",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile information saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-gray-800 flex flex-col">
      {/* UPDATES HERE:
         1. Removed 'max-w-7xl' and 'mx-auto' so it spans full width.
         2. Changed 'mt-24' to 'pt-20' to reduce the top gap while clearing the fixed header.
      */}
      <Header userName="Sherielyn Guadiana" />
      <main className="flex-grow w-full px-4 md:px-12 py-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          {/* Left Column: Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 h-fit text-center relative border border-gray-100">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={userData.profileImg}
                alt="User Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-sm"
              />
              <button
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                aria-label="Edit avatar"
              >
                <Camera size={18} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {userData.userName}
            </h2>

            {userData.isVerified && (
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6 uppercase tracking-wide">
                <ShieldCheck size={16} /> VERIFIED
              </div>
            )}

            <div className="text-left border-t border-gray-100 pt-6 mt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Bio:
              </h3>
              {isEditing ? (
                <textarea
                  id="bio"
                  rows={5}
                  value={userData.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-sm transition-all resize-none focus:ring-2 focus:ring-blue-100 border-blue-300"
                />
              ) : (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {userData.bio}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Forms */}
          <div className="flex flex-col gap-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  Basic Information
                </h3>
              </div>

              {/* Edit Profile Button */}
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isEditing ? "bg-gray-100 text-gray-600" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
              >
                <Pencil size={16} />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>

              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="userName"
                      className="text-xs font-semibold text-gray-500 uppercase"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="userName"
                      value={userData.userName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="birthday"
                      className="text-xs font-semibold text-gray-500 uppercase"
                    >
                      Birthday
                    </label>
                    <input
                      type="text"
                      id="birthday"
                      value={userData.birthday}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="age"
                      className="text-xs font-semibold text-gray-500 uppercase"
                    >
                      Age
                    </label>
                    <input
                      type="text"
                      id="age"
                      value={userData.age}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="address"
                      className="text-xs font-semibold text-gray-500 uppercase"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={2}
                      value={userData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all resize-none ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-gray-500 uppercase"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-xs font-semibold text-gray-500 uppercase"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="bio"
                      className="text-xs font-semibold text-gray-500 uppercase"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={5}
                      value={userData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all resize-none ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-2 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors shadow-sm flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Client-Specific Information */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Client-Specific Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="companyName"
                    className="text-xs font-semibold text-gray-500 uppercase"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    placeholder="e.g. Dale Inc."
                    value={userData.companyName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="role"
                    className="text-xs font-semibold text-gray-500 uppercase"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    placeholder="e.g. CEO"
                    value={userData.role}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? "bg-white border-blue-300 focus:ring-2 focus:ring-blue-100" : "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"}`}
                  />
                </div>
              </div>
            </div>

            {/* Payment Preferences */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Payment Preferences
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-20 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-400 transition-colors cursor-pointer group"
                  >
                    <span className="text-sm font-medium group-hover:scale-105 transition-transform">
                      + Add Method
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientProfilePage;
