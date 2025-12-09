import React, { useState, useEffect } from "react";
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
  MessageSquare,
  Wallet,
  CheckCircle2,
  MapPin,
  Wrench,
  Plus,
  X,
  Loader2,
} from "lucide-react";

// --- Interfaces ---
interface Address {
  street: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
}

interface Name {
  firstName: string;
  lastName: string;
}

interface User {
  name: Name;
  email: string;
  contactNumber: string;
  address: Address;
  birthdate: string;
  photoURL?: string;
  isVerified?: boolean;
  bio?: string;
}

interface Worker {
  workerID: number;
  user: User;
  skills: string[];
  coverage_areas: string[]; // Matches Java field name
  hourlyRate: number;
  dailyRate: number;
  completedJobCount: number;
  availabilityStatus: boolean;
  averageRating: number;
  totalEarnings: number;
}

const WorkerProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // New saving state

  // --- State ---
  const [userData, setUserData] = useState({
    profileImg: "https://i.pravatar.cc/300",
    userName: "",
    firstName: "",
    lastName: "",
    birthday: "",
    age: 0,
    address: "",
    email: "",
    phone: "",
    bio: "",
    isVerified: false,
    isAvailable: false,
    performance: {
      totalReviews: 0,
      avgRating: 0,
      jobsCompleted: 0,
      hourlyRate: 0,
      dailyRate: 0,
      totalEarnings: 0,
    },
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [coverageAreas, setCoverageAreas] = useState<string[]>([]);

  // Input states for adding new items
  const [newSkill, setNewSkill] = useState("");
  const [newArea, setNewArea] = useState("");

  // --- Fetch Data ---
  useEffect(() => {
    fetchWorkerData();
  }, []);

  const fetchWorkerData = async () => {
    const storedId = localStorage.getItem("currentUserId");
    if (!storedId) return;

    try {
      const res = await fetch(
        `http://localhost:8080/api/worker/getWorker/${storedId}`,
      );
      if (res.ok) {
        const data: Worker = await res.json();

        // Helper to format address safely
        const formatAddress = (addr: Address) =>
          addr ? `${addr.street}, ${addr.barangay}, ${addr.city}` : "";

        // Helper to calculate age
        const calculateAge = (dob: string) => {
          if (!dob) return 0;
          const birth = new Date(dob);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          if (
            today.getMonth() < birth.getMonth() ||
            (today.getMonth() === birth.getMonth() &&
              today.getDate() < birth.getDate())
          )
            age--;
          return age;
        };

        setUserData({
          profileImg: data.user.photoURL || "https://i.pravatar.cc/300",
          userName: `${data.user.name.firstName} ${data.user.name.lastName}`,
          firstName: data.user.name.firstName,
          lastName: data.user.name.lastName,
          birthday: data.user.birthdate || "",
          age: calculateAge(data.user.birthdate),
          address: formatAddress(data.user.address),
          email: data.user.email,
          phone: data.user.contactNumber,
          bio: data.user.bio || "No bio added yet.",
          isVerified: data.user.isVerified || false,
          isAvailable: data.availabilityStatus,
          performance: {
            totalReviews: 0,
            avgRating: data.averageRating,
            jobsCompleted: data.completedJobCount,
            hourlyRate: data.hourlyRate,
            dailyRate: data.dailyRate,
            totalEarnings: data.totalEarnings,
          },
        });

        setSkills(data.skills || []);
        setCoverageAreas(data.coverage_areas || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Handlers ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const addCoverageArea = () => {
    if (newArea && !coverageAreas.includes(newArea)) {
      setCoverageAreas([...coverageAreas, newArea]);
      setNewArea("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    if (!isEditing) return;
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const removeArea = (areaToRemove: string) => {
    if (!isEditing) return;
    setCoverageAreas(coverageAreas.filter((a) => a !== areaToRemove));
  };

  // --- UPDATED SUBMIT HANDLER ---
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const storedId = localStorage.getItem("currentUserId");

    if (!storedId) {
      setIsSaving(false);
      return;
    }

    // Construct Payload
    // NOTE: We omit 'user' object to prevent overwriting User details (Address/Name) with null/incomplete data
    // This safely updates only the Worker-specific fields (Skills, Coverage, Rates, Status).
    const payload = {
      workerID: parseInt(storedId),
      skills: skills,
      coverage_areas: coverageAreas, // Make sure this matches backend field name
      hourlyRate: userData.performance.hourlyRate,
      dailyRate: userData.performance.dailyRate,
      completedJobCount: userData.performance.jobsCompleted,
      availabilityStatus: userData.isAvailable,
      averageRating: userData.performance.avgRating,
      totalEarnings: userData.performance.totalEarnings,
      user: null, // Explicitly null so Service skips User updates
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/worker/updateWorker/${storedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        alert("Skills and Coverage Areas updated successfully!");
        setIsEditing(false);
        // Optional: Re-fetch to ensure sync
        fetchWorkerData();
      } else {
        const errorText = await response.text();
        console.error("Update failed:", errorText);
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Connection error. Ensure backend is running.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Components ---
  const StatCard = ({ label, value, icon, colorClass }: any) => (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
      <div className={`p-2 rounded-full bg-white shadow-sm mb-2 ${colorClass}`}>
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">
        {label}
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        Loading Profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-gray-800 flex flex-col">
      <Header userName={`${userData.firstName} ${userData.lastName}`} />

      <main className="flex-grow w-full  mx-auto px-4 md:px-6 py-8 md:py-10 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          {/* --- LEFT COLUMN: Profile Card --- */}
          <div className="bg-white rounded-2xl shadow-sm p-8 h-fit text-center relative border border-gray-100">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={userData.profileImg}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-sm"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600">
                  <Camera size={18} />
                </button>
              )}
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {userData.userName}
            </h2>

            {userData.isVerified && (
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <ShieldCheck size={16} /> VERIFIED WORKER
              </div>
            )}

            {/* Availability Toggle */}
            <div
              className={`mt-4 mb-6 p-3 rounded-xl border flex items-center justify-between ${userData.isAvailable ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
            >
              <span
                className={`text-sm font-bold ${userData.isAvailable ? "text-green-700" : "text-gray-500"}`}
              >
                {userData.isAvailable
                  ? "Available for Jobs"
                  : "Currently Unavailable"}
              </span>
              <div
                className={`w-3 h-3 rounded-full ${userData.isAvailable ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              ></div>
            </div>

            <div className="text-left border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Bio:
              </h3>
              {isEditing ? (
                <textarea
                  id="bio"
                  rows={4}
                  value={userData.bio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-100 border-blue-300"
                />
              ) : (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {userData.bio}
                </p>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN: Details & Forms --- */}
          <div className="flex flex-col gap-8">
            {/* 1. Basic Information Form */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  Basic Information
                </h3>
              </div>

              <button
                type="button" // explicit type
                onClick={() => setIsEditing(!isEditing)}
                className={`absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isEditing
                    ? "bg-gray-100 text-gray-600"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                <Pencil size={16} />
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>

              <form onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      value={userData.userName}
                      disabled
                      className="w-full px-4 py-3 border rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Birthday
                    </label>
                    <input
                      type="text"
                      id="birthday"
                      value={userData.birthday}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white" : "bg-gray-50"}`}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={1}
                      value={userData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm resize-none ${isEditing ? "bg-white" : "bg-gray-50"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white" : "bg-gray-50"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white" : "bg-gray-50"}`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <CheckCircle2 size={18} />
                      )}
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* 2. Skills & Coverage */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                <Wrench size={20} className="text-blue-500" /> Skills & Coverage
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Skills */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    My Skills
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        {skill}
                        {isEditing && (
                          <button onClick={() => removeSkill(skill)}>
                            <X size={12} />
                          </button>
                        )}
                      </span>
                    ))}
                    {skills.length === 0 && (
                      <span className="text-sm text-gray-400 italic">
                        No skills added.
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add skill (e.g. Plumbing)"
                        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Coverage Areas */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Coverage Areas
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {coverageAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1"
                      >
                        <MapPin size={12} /> {area}
                        {isEditing && (
                          <button onClick={() => removeArea(area)}>
                            <X size={12} />
                          </button>
                        )}
                      </span>
                    ))}
                    {coverageAreas.length === 0 && (
                      <span className="text-sm text-gray-400 italic">
                        No areas added.
                      </span>
                    )}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newArea}
                        onChange={(e) => setNewArea(e.target.value)}
                        placeholder="Add City (e.g. Cebu)"
                        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={addCoverageArea}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Work Performance Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
                Work Performance
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
                  value={`₱${userData.performance.totalEarnings}`}
                  icon={<Wallet size={20} />}
                  colorClass="text-green-500"
                />
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
