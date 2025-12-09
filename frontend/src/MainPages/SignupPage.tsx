import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";
import Logo from "../MainComponents/LandingComponents/Logo/Logo";

interface SignUpProps {
  onSelectRole: (role: "worker" | "client") => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSelectRole }) => {
  const [formData, setFormData] = useState({
    // Standardized Name Fields
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
  const [fileName, setFileName] = useState("No file chosen");

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const checkUsernameAvailability = async (
    username: string,
  ): Promise<boolean> => {
    if (!username) return false;
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/exists/${username}`,
      );
      if (response.ok) return await response.json();
      return false;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
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

      // Payload strictly using firstName, middleName, lastName
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

      if (formData.role === "client") {
        const clientPayload = {
          company_name: formData.companyName,
          role: "Hiring Manager",
          user: userPayload,
        };
        response = await fetch("http://localhost:8080/api/client/postClient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientPayload),
        });
      } else {
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
        response = await fetch("http://localhost:8080/api/worker/postWorker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(workerPayload),
        });
      }

      if (response.ok) {
        const data = await response.json();

        if (formData.role === "client" && data.clientID) {
          localStorage.setItem("currentUserId", data.clientID.toString());
          localStorage.setItem("userRole", "CLIENT");
          alert("Client Account Created!");
          navigate("/client/dashboard");
        } else if (formData.role === "worker" && data.workerID) {
          localStorage.setItem("currentUserId", data.workerID.toString());
          localStorage.setItem("userRole", "WORKER");
          alert("Worker Account Created!");
          navigate("/worker/dashboard");
        } else {
          alert("Registration Successful! Please Sign In.");
          navigate("/signin");
        }
      } else {
        const errorText = await response.text();
        console.error("Registration Error:", errorText);
        alert("Registration Failed.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Connection Failed.");
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
        {/* Left Panel */}
        <div className="relative md:w-1/3 bg-gradient-to-br from-blue-50 to-white p-8 flex flex-col items-center justify-center text-center border-r border-gray-100">
          <Link to="/" className="hover:scale-105 transition-transform">
            <Logo variant="lg" />
          </Link>
          <div className="space-y-3 mt-4">
            <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
            <p className="text-gray-600 max-w-xs mx-auto">
              Create your account to start connecting.
            </p>
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

            {/* File Upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Government ID
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-l-lg border border-gray-200 text-sm"
                >
                  Upload File
                </button>
                <span className="flex-1 px-4 py-2.5 border border-l-0 border-gray-200 rounded-r-lg text-sm text-gray-500 bg-gray-50">
                  {fileName}
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
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
