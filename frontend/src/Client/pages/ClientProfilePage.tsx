import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/ClientFooter";
import { ShieldCheck, Camera, Pencil, CheckCircle2 } from "lucide-react";
import Header from "../components/ClientHeader";

interface Address {
  street: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
}

// Strict Interface
interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
}

interface User {
  id: number;
  name: Name;
  email: string;
  contactNumber: string;
  address: Address;
  birthdate: string;
  photoURL?: string;
  isVerified?: boolean;
  username: string;
}

interface Client {
  clientID: number;
  company_name: string;
  role: string;
  user: User;
}

const ClientProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    profileImg: "https://i.pravatar.cc/150?u=default_user",
    userName: "Loading...",
    firstName: "",
    lastName: "",
    birthday: "",
    age: 0,
    address: "",
    email: "",
    phone: "",
    bio: "Bio not available yet.",
    isVerified: false,
    companyName: "",
    role: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedId = localStorage.getItem("currentUserId");
        if (!storedId) {
          navigate("/signin");
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/client/getClient/${storedId}`,
        );

        if (response.ok) {
          const data: Client = await response.json();

          const calculateAge = (birthDateString: string) => {
            if (!birthDateString) return 0;
            const birth = new Date(birthDateString);
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

          const formatAddress = (addr: Address) => {
            if (!addr) return "";
            return `${addr.street}, ${addr.barangay}, ${addr.city}, ${addr.province}, ${addr.postalCode}`;
          };

          // Strictly using firstName and lastName
          setUserData({
            profileImg:
              data.user.photoURL || "https://i.pravatar.cc/150?u=default_user",
            userName: `${data.user.name.firstName} ${data.user.name.lastName}`,
            firstName: data.user.name.firstName,
            lastName: data.user.name.lastName,
            birthday: data.user.birthdate || "",
            age: calculateAge(data.user.birthdate),
            address: formatAddress(data.user.address),
            email: data.user.email,
            phone: data.user.contactNumber,
            bio: "Bio feature coming soon!",
            isVerified: data.user.isVerified || false,
            companyName: data.company_name || "",
            role: data.role || "Client",
          });
        } else {
          if (response.status === 500 || response.status === 404) {
            localStorage.removeItem("currentUserId");
            navigate("/signin");
          }
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile saved locally!");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-gray-800 flex flex-col">
      <Header userName={`${userData.firstName} ${userData.lastName}`} />

      <main className="flex-grow w-full px-4 md:px-12 py-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 h-fit text-center border border-gray-100">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={userData.profileImg}
                alt="User Profile"
                className="w-full h-full rounded-full object-cover border-4 border-gray-100 shadow-sm"
              />
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {userData.userName}
            </h2>
            {userData.isVerified && (
              <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
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
                  className="w-full px-4 py-3 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                <p className="text-sm text-gray-500 leading-relaxed">
                  {userData.bio}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 relative">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  Basic Information
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className={`absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isEditing ? "bg-gray-100 text-gray-600" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
              >
                <Pencil size={16} />{" "}
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
                      id="userName"
                      value={userData.userName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white border-blue-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
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
                      className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white border-blue-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase">
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
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={2}
                      value={userData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-lg text-sm resize-none ${isEditing ? "bg-white border-blue-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
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
                      className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white border-blue-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
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
                      className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white border-blue-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
                    />
                  </div>
                </div>
                {isEditing && (
                  <div className="flex justify-end pt-2 border-t border-gray-100">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} /> Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                Client-Specific Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    value={userData.companyName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white border-blue-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={userData.role}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-lg text-sm ${isEditing ? "bg-white border-blue-300" : "bg-gray-50 border-gray-200 cursor-not-allowed"}`}
                  />
                </div>
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
