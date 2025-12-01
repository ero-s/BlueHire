import React, { useState } from "react";
import Header from "../components/WorkerHeader";
import Footer from "../components/WorkerFooter";
import { 
    ShieldCheck, 
    Camera, 
    Pencil, 
    Star, 
    Briefcase, 
    Clock, 
    Calendar, 
    // DollarSign, 
    MessageSquare,
    Wallet,
    CheckCircle2,
    // XCircle,
    X
} from "lucide-react";

interface WorkerData {
  profileImg: string;
  userName: string;
  birthday: string;
  age: number;
  address: string;
  email: string;
  phone: string;
  bio: string;
  isVerified: boolean;
  isAvailable: boolean;
  performance: {
    totalReviews: number;
    avgRating: number;
    jobsCompleted: number;
    hourlyRate: number;
    dailyRate: number;
    totalEarnings: number;
  };
}

const WorkerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState<WorkerData>({
    profileImg: "https://picsum.photos/id/433/300/300",
    userName: "Mateo Rodriguez",
    birthday: "March 15, 1993",
    age: 31,
    address: "456 Narra Street, Brgy. San Antonio, Pasig City, Metro Manila, 1600, Philippines",
    email: "mateo.rodriguez@bluehire.com",
    phone: "+63 917 123 4567",
    bio: "Experienced skilled laborer with a focus on carpentry and general construction. Dedicated to delivering high-quality craftsmanship and maintaining safety standards on every job site. Quick learner and reliable team player.",
    isVerified: true,
    isAvailable: true,
    performance: {
        totalReviews: 87,
        avgRating: 4.8,
        jobsCompleted: 92,
        hourlyRate: 350,
        dailyRate: 2500,
        totalEarnings: 230000
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setUserData(prev => ({ ...prev, [id]: value }));
  };

  const toggleAvailability = () => {
    setUserData(prev => ({ ...prev, isAvailable: !prev.isAvailable }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile information saved successfully!");
  };

  const StatCard = ({ label, value, icon, colorClass }: { label: string, value: string | number, icon: React.ReactNode, colorClass: string }) => (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
        <div className={`p-2 rounded-full bg-white shadow-sm mb-2 ${colorClass}`}>
            {icon}
        </div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">{label}</div>
    </div>
  );

  // --- State for Skills & Coverage Areas ---
const [skills, setSkills] = useState<string[]>(["Carpentry", "Plumbing", "Electrical"]);
const [coverageAreas, setCoverageAreas] = useState<string[]>(["Pasig", "Makati", "Quezon City"]);
const [newSkill, setNewSkill] = useState("");
const [newArea, setNewArea] = useState("");

// --- Handlers for Skills ---
const handleAddSkill = () => {
  const trimmed = newSkill.trim();
  if (trimmed && !skills.includes(trimmed)) {
    setSkills(prev => [...prev, trimmed]);
    setNewSkill("");
  }
};

const handleRemoveSkill = (skill: string) => {
  setSkills(prev => prev.filter(s => s !== skill));
};

// --- Handlers for Coverage Areas ---
const handleAddArea = () => {
  const trimmed = newArea.trim();
  if (trimmed && !coverageAreas.includes(trimmed)) {
    setCoverageAreas(prev => [...prev, trimmed]);
    setNewArea("");
  }
};

const handleRemoveArea = (area: string) => {
  setCoverageAreas(prev => prev.filter(a => a !== area));
};


  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-gray-800 flex flex-col">
      <Header userName="Sherielyn Guadiana" />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          {/* Left Column: Profile Card */}
          <div className="flex flex-col gap-8 h-fit">
            
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center relative border border-gray-100">
                <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                    src={userData.profileImg}
                    alt="User Profile"
                    className="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-sm"
                />
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors" aria-label="Edit avatar">
                    <Camera size={18} />
                </button>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">{userData.userName}</h2>
                
                {userData.isVerified && (
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6 uppercase tracking-wide">
                    <ShieldCheck size={16} /> VERIFIED
                </div>
                )}

                {/* Availability Status */}
                <div className="mb-8 pb-8 border-b border-gray-100">
                    <div 
                        onClick={toggleAvailability}
                        className={`cursor-pointer select-none rounded-xl p-4 border-2 transition-all duration-200 flex items-center justify-between group ${userData.isAvailable ? 'border-green-100 bg-green-50/50' : 'border-gray-200 bg-gray-50'}`}
                    >
                        <div className="text-left">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Current Status</p>
                            <p className={`font-bold ${userData.isAvailable ? 'text-green-700' : 'text-gray-600'}`}>
                                {userData.isAvailable ? 'Available for Work' : 'Not Available'}
                            </p>
                        </div>
                        <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${userData.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${userData.isAvailable ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-left">Click to toggle your availability status for new jobs.</p>
                </div>

                {/* Bio */}
                <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 mb-3">Bio</h3>
                {isEditing ? (
                    <textarea
                    id="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 border-blue-300 transition-all"
                    />
                ) : (
                    <p className="text-sm text-gray-500 leading-relaxed">{userData.bio}</p>
                )}
                </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-600 mb-6 text-center">Skills</h3>
                
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                    {skills.map((skill, index) => (
                    <div key={index} className="bg-gray-100 border-2 border-gray-300 px-4 py-2 rounded-md flex items-center gap-3 text-gray-800 font-medium text-sm">
                        <span>{skill}</span>
                        <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-gray-900 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${skill}`}
                        >
                        <X size={16} strokeWidth={3} />
                        </button>
                    </div>
                    ))}
                </div>

                <div className="mt-auto">
                  <div className="border-2 border-blue-300 rounded-full flex items-center p-1.5 ring-blue-100 transition-all bg-white">
                    <input 
                      type="text" 
                      placeholder="Add Skills..." 
                      className="flex-grow px-4 py-2 outline-none text-gray-600 bg-transparent placeholder-gray-400 text-sm rounded-full"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <button 
                      onClick={handleAddSkill}
                      className="ml-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-3 px-6 rounded-full transition-colors text-sm"
                    >
                      Enter
                    </button>
                  </div>
                </div>

            </div>

            {/* Coverage Areas Card */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-600 mb-6 text-center">Coverage Areas</h3>
                
                <div className="flex flex-wrap gap-3 mb-8 justify-center">
                    {coverageAreas.map((area, index) => (
                    <div key={index} className="bg-gray-100 border-2 border-gray-300 px-4 py-2 rounded-md flex items-center gap-3 text-gray-800 font-medium text-sm">
                        <span>{area}</span>
                        <button 
                        onClick={() => handleRemoveArea(area)}
                        className="text-gray-900 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${area}`}
                        >
                        <X size={16} strokeWidth={3} />
                        </button>
                    </div>
                    ))}
                </div>

                <div className="mt-auto">
                    <div className="border-2 border-blue-300 rounded-full flex items-center p-1.5 focus-within:ring-4 ring-blue-100 transition-all bg-white">
                        <input 
                            type="text" 
                            placeholder="Add location..." 
                            className="flex-grow px-4 py-2 outline-none text-gray-600 bg-transparent placeholder-gray-400 text-sm rounded-full"
                            value={newArea}
                            onChange={(e) => setNewArea(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddArea()}
                        />
                        <button 
                            onClick={handleAddArea}
                            className="ml-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-3 px-6 rounded-full transition-colors text-sm"
                        >
                            Enter
                        </button>
                    </div>
                </div>
            </div>

          </div>

          {/* Right Column: Forms & Stats */}
          <div className="flex flex-col gap-8">
            
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Basic Information</h3>
              </div>

               {/* Edit Profile Button */}
              <button 
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isEditing ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
              >
                <Pencil size={16} />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>

              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="userName" className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                    <input
                      type="text"
                      id="userName"
                      value={userData.userName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
                    />
                  </div>
                  {/* Birthday */}
                  <div className="space-y-2">
                    <label htmlFor="birthday" className="text-xs font-semibold text-gray-500 uppercase">Birthday</label>
                    <input
                      type="text"
                      id="birthday"
                      value={userData.birthday}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
                    />
                  </div>
                  {/* Age */}
                  <div className="space-y-2">
                    <label htmlFor="age" className="text-xs font-semibold text-gray-500 uppercase">Age</label>
                    <input 
                        type="text" 
                        id="age"
                        value={userData.age} 
                        readOnly 
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 text-sm cursor-not-allowed" 
                    />
                  </div>
                  {/* Address */}
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="address" className="text-xs font-semibold text-gray-500 uppercase">Address</label>
                    <textarea
                      id="address"
                      rows={2}
                      value={userData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all resize-none ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
                    ></textarea>
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
                    />
                  </div>
                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
                    />
                  </div>
                  {/* Bio in form */}
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="bio" className="text-xs font-semibold text-gray-500 uppercase">Bio</label>
                    <textarea
                      id="bio"
                      rows={5}
                      value={userData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm transition-all resize-none ${isEditing ? 'bg-white border-blue-300 focus:ring-2 focus:ring-blue-100' : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'}`}
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

            {/* Work Performance */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                Work Performance
                <span className="text-xs font-normal bg-blue-50 text-blue-600 px-2 py-1 rounded-full">Analytics</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 <StatCard 
                    label="Total Reviews" 
                    value={userData.performance.totalReviews} 
                    icon={<MessageSquare size={20} />}
                    colorClass="text-purple-500"
                 />
                 <StatCard 
                    label="Average Rating" 
                    value={userData.performance.avgRating} 
                    icon={<Star size={20} fill="currentColor" />}
                    colorClass="text-yellow-500"
                 />
                 <StatCard 
                    label="Jobs Completed" 
                    value={userData.performance.jobsCompleted} 
                    icon={<Briefcase size={20} />}
                    colorClass="text-blue-500"
                 />
                 <StatCard 
                    label="Hourly Rate" 
                    value={`₱${userData.performance.hourlyRate}`} 
                    icon={<Clock size={20} />}
                    colorClass="text-teal-500"
                 />
                 <StatCard 
                    label="Daily Rate" 
                    value={`₱${userData.performance.dailyRate}`} 
                    icon={<Calendar size={20} />}
                    colorClass="text-orange-500"
                 />
                 <StatCard 
                    label="Total Earnings" 
                    value={`₱${(userData.performance.totalEarnings / 1000).toFixed(1)}k`} 
                    icon={<Wallet size={20} />}
                    colorClass="text-green-500"
                 />
              </div>
            </div>

            {/* Payment Preferences */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Payment Preferences</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 border border-dashed border-gray-300 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-400 transition-colors cursor-pointer group">
                        <span className="text-sm font-medium group-hover:scale-105 transition-transform">+ Add Method</span>
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

export default WorkerProfile;
