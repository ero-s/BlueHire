import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";
import Logo from "../MainComponents/LandingComponents/Logo/Logo";

interface SignUpProps {
  onSelectRole: (role: "worker" | "client") => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSelectRole }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    // Address Fields
    street: "",
    barangay: "",
    city: "",
    province: "",
    postalCode: "",
    // User Entity Fields
    email: "",
    contactNumber: "",
    birthdate: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    // Client Specific Field
    companyName: "",
  });

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  
  // Image State
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [documentType, setDocumentType] = useState("GOV_ID");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "username") setUsernameError(null);
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]); 
      setFileName(e.target.files[0].name); 
    }
  };

  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    if (!username) return false;
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/exists/${username}`,
      );
      if (response.ok) {
        return await response.json();
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  // --- UPDATED SUBMIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Password Match Check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 2. MANDATORY FILE CHECK
    if (!image) {
      alert("Verification Failed: Please upload a valid Government ID or Document.");
      return;
    }

    setIsSubmitting(true);
    setUsernameError(null);

    try {
      const isTaken = await checkUsernameAvailability(formData.username);
      if (isTaken) {
        setUsernameError("This username is already taken.");
        setIsSubmitting(false);
        return;
      }

      // Shared User Payload
      const userPayload = {
        name: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
        },
        address: {
          street: formData.street,
          barangay: formData.barangay,
          city: formData.city,
          province: formData.province,
          postalCode: parseInt(formData.postalCode) || 0,
        },
        email: formData.email,
        contactNumber: formData.contactNumber,
        username: formData.username,
        password: formData.password,
        role: formData.role.toUpperCase(),
        birthdate: formData.birthdate,
      };

      let response;
      const data = new FormData(); // Create FormData envelope

      // --- SCENARIO 1: CLIENT ---
      if (formData.role === "client") {
        const clientPayload = {
          company_name: formData.companyName || "N/A",
          role: "Hiring Manager",
          user: userPayload,
        };

        // Append to FormData
        data.append("client", JSON.stringify(clientPayload)); // Pocket 1: JSON
        data.append("file", image);                           // Pocket 2: File
        data.append("docType", documentType);

        response = await fetch("http://localhost:8080/api/client/postClient", {
          method: "POST",
          body: data, // No Content-Type header! Browser handles it.
        });
      } 
      
      // --- SCENARIO 2: WORKER ---
      else {
        const workerPayload = {
          user: userPayload,
          skills: [],
          coverage_areas: [],
          hourlyRate: 0.0,
          dailyRate: 0.0,
          availabilityStatus: true,
          completedJobCount: 0,
          averageRating: 0.0,
          totalEarnings: 0.0,
        };

        // Append to FormData
        data.append("worker", JSON.stringify(workerPayload)); // Pocket 1: JSON
        data.append("file", image);                           // Pocket 2: File
        data.append("docType", documentType);

        response = await fetch("http://localhost:8080/api/worker/postWorker", {
          method: "POST",
          body: data, 
        });
      }

      // --- HANDLE RESPONSE ---
      if (response.ok) {
        const responseData = await response.json().catch(() => ({}));

        if (formData.role === "client" && responseData.clientID) {
          localStorage.setItem("currentUserId", responseData.clientID.toString());
          localStorage.setItem("userRole", "CLIENT");
          alert("Client Account Created Successfully!");
          navigate("/client/dashboard");
        } else if (formData.role === "worker") {
          if (responseData.workerID) {
             localStorage.setItem("currentUserId", responseData.workerID.toString());
          }
          localStorage.setItem("userRole", "WORKER");
          alert("Worker Account Created Successfully!");
          navigate("/worker/dashboard");
        } else {
          alert("Registration Successful! Please Sign In.");
          navigate("/signin");
        }
      } else {
        const errorText = await response.text();
        console.error("Registration Error:", errorText);
        alert(`Registration Failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Connection Failed. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gray-50 font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-blue-50 to-[#3d6691]/20"></div>

      {showError && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}

      <button
        onClick={() => navigate("/landing")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 text-[#3d6691]" />
        <span className="hidden md:inline text-[#3d6691] font-medium">
          Back to Home
        </span>
      </button>

      <div className="relative flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 m-4 max-h-[90vh] border border-gray-100">
        
        {/* Left Section - Fixed */}
        <div className="relative md:w-1/3 bg-gradient-to-br from-blue-50 to-white p-8 flex flex-col items-center justify-center text-center overflow-hidden shrink-0 border-r border-gray-100">
          <div className="absolute top-0 left-0 w-full h-full opacity-30">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#4D7EAF] rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <Link
              to="/"
              className="hover:scale-105 transition-transform duration-300"
            >
              <Logo variant="lg" />
            </Link>
            <div className="space-y-3 mt-4">
              <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
              <p className="text-gray-600 max-w-xs mx-auto leading-relaxed">
                Create your account to start connecting with the best
                opportunities.
              </p>
            </div>
            <div className="w-16 h-1 bg-[#4D7EAF] rounded-full mt-4 opacity-50"></div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto bg-white">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">
            Create An Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Middle Name
                  </label>
                  <input
                    name="middleName"
                    type="text"
                    placeholder="Q"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                  />
                </div>
              </div>
            </div>

            {/* Address Fields */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  name="street"
                  type="text"
                  placeholder="Street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="barangay"
                    type="text"
                    placeholder="Barangay"
                    value={formData.barangay}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                  />
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="province"
                    type="text"
                    placeholder="Province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                  />
                  <input
                    name="postalCode"
                    type="number"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                  />
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Account Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                />
                <input
                  name="contactNumber"
                  type="tel"
                  placeholder="Phone"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                />
                <input
                  name="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                >
                  <option value="">Select Role</option>
                  <option value="worker">Worker</option>
                  <option value="client">Client</option>
                </select>
              </div>

              {formData.role === "client" && (
                <div className="mt-2">
                  <label className="block text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Company Name
                  </label>
                  <input
                    name="companyName"
                    type="text"
                    placeholder="Company Name (Optional)"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-blue-50/50 border border-blue-200 rounded-lg outline-none text-[#3d6691]"
                  />
                </div>
              )}

              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 bg-gray-50 border ${usernameError ? "border-red-500" : "border-gray-200"} rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20`}
                />
                {usernameError && (
                  <p className="text-xs text-red-500 mt-1">{usernameError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                />
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#3d6691]/20"
                />
              </div>
            </div>

            {/* Document Verification Section */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Document Verification
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ID Type Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    ID Type
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all cursor-pointer"
                  >
                    <option value="GOV_ID">Government ID</option>
                    <option value="PASSPORT">Passport</option>
                    <option value="DRIVER_LICENSE">Driver's License</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                {/* File Upload Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Upload Document
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="govId"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-l-lg hover:bg-gray-200 focus:outline-none transition-colors border border-r-0 border-gray-200 text-sm whitespace-nowrap"
                    >
                      Choose File
                    </button>
                    <span className="flex-1 px-4 py-2 border border-l-0 border-gray-200 rounded-r-lg text-sm text-gray-500 truncate bg-gray-50 block min-w-0">
                      {fileName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 flex justify-center bg-[#3d6691] text-white font-bold py-3.5 rounded-xl hover:bg-[#2c4b6b] transition-all disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" /> Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-[#3d6691]">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;