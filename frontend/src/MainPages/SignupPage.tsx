import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Briefcase, Loader2 } from "lucide-react";
import { useEffect } from "react";

// --- Local Logo Component ---
interface LogoProps {
  variant?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ variant = "md" }) => {
  const sizeClasses = {
    sm: { icon: "w-6 h-6", text: "text-lg" },
    md: { icon: "w-8 h-8", text: "text-2xl" },
    lg: { icon: "w-12 h-12", text: "text-4xl" },
  };

  const selectedSize = sizeClasses[variant];

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`flex items-center justify-center bg-blue-100 text-[#4D7EAF] rounded-full p-3 shadow-sm`}
      >
        <Briefcase className={`${selectedSize.icon}`} />
      </div>

      <div className={`font-bold font-sans ${selectedSize.text} flex gap-1`}>
        <span className="text-[#4D7EAF]">Blue</span>
        <span className="text-gray-700">Hire</span>
      </div>
    </div>
  );
};

interface SignUpProps {
  onSelectRole?: (role: "worker" | "client") => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSelectRole }) => {
  const [formData, setFormData] = useState({
    // Name Embeddable Fields
    fname: "",
    middlename: "",
    lname: "",
    // Address Embeddable Fields
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
  });

  // State to track username availability errors
  const [usernameError, setUsernameError] = useState<string | null>(null);
  // State to track loading status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File upload state
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [error, setError] = useState(""); // Current error message
  const [showError, setShowError] = useState(false); // Show popup
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Clear error popup after 3 seconds
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

    // Clear the username error immediately when the user starts typing again
    if (name === "username") {
      setUsernameError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // --- 1. Helper Function: Check Username API ---
  const checkUsernameAvailability = async (
    username: string,
  ): Promise<boolean> => {
    if (!username) return false;
    try {
      // Connects to: UserController @GetMapping("/exists/{username}")
      const response = await fetch(
        `http://localhost:8080/api/user/exists/${username}`,
      );

      if (response.ok) {
        // The backend returns a boolean (true if exists, false if not)
        return await response.json();
      } else {
        console.warn("Username check endpoint error:", response.status);
        return false; // Fallback: assume available if server errors (or handle differently)
      }
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic Password Match Check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);
    setUsernameError(null);

    try {
      // --- 2. Check Username Availability Logic ---
      // We await the result before proceeding to registration
      const isTaken = await checkUsernameAvailability(formData.username);

      if (isTaken) {
        const errorMsg =
          "This username is already taken. Please choose another.";
        setUsernameError(errorMsg);
        // We stop the submission here so the POST request is never sent
        setIsSubmitting(false);
        return;
      }

      // Prepare the data payload matching the Java User entity structure
      const userPayload = {
        name: {
          fname: formData.fname,
          middlename: formData.middlename,
          lname: formData.lname,
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
        role: formData.role.toUpperCase(), // Ensure uppercase for Enum mapping
        birthdate: formData.birthdate,
      };

      // --- 3. Register User ---
      const response = await fetch("http://localhost:8080/api/user/postUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPayload),
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/signin");
      } else {
        const errorText = await response.text();
        console.error("Registration Error:", errorText);
        alert("Registration Failed. Please check your inputs.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Connection Failed. Please ensure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 font-sans">
      {/* --- Background Design --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-blue-50 to-[#3d6691]/20"></div>
      <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#3d6691]/10 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>

      {/* Error Popup */}
      {showError && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {error}
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate("/landing")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all duration-200 border border-gray-100"
      >
        <ArrowLeft className="w-5 h-5 text-[#3d6691]" />
        <span className="hidden md:inline text-[#3d6691] font-medium">
          Back to Home
        </span>
      </button>

      {/* --- Sign Up Card --- */}
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

        {/* Right Section (Form) - Scrollable */}
        <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto bg-white">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Create An Account
            </h1>
            <p className="text-gray-500 mt-2">
              Please fill in your details to register.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Information */}
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
                    name="fname"
                    type="text"
                    placeholder="John"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Middle Name
                  </label>
                  <input
                    name="middlename"
                    type="text"
                    placeholder="Quincy"
                    value={formData.middlename}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    name="lname"
                    type="text"
                    placeholder="Doe"
                    value={formData.lname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Street
                  </label>
                  <input
                    name="street"
                    type="text"
                    placeholder="123 Main St"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Barangay
                    </label>
                    <input
                      name="barangay"
                      type="text"
                      placeholder="Barangay"
                      value={formData.barangay}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Province
                    </label>
                    <input
                      name="province"
                      type="text"
                      placeholder="Province"
                      value={formData.province}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Postal Code
                    </label>
                    <input
                      name="postalCode"
                      type="number"
                      placeholder="6000"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Contact Number
                  </label>
                  <input
                    name="contactNumber"
                    type="tel"
                    placeholder="0912 345 6789"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Birthdate
                  </label>
                  <input
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  >
                    <option value="">Select Role</option>
                    <option value="worker">Worker</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Username
                </label>
                {/* Visual feedback for error state */}
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 bg-gray-50 border ${
                    usernameError
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-200"
                  } rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all`}
                />
                {/* Error Message Display */}
                {usernameError && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {usernameError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#3d6691]/20 focus:border-[#3d6691] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Government ID Upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Government ID
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  id="govId"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-l-lg hover:bg-gray-200 focus:outline-none transition-colors border border-r-0 border-gray-200 text-sm"
                >
                  Upload File
                </button>
                <span className="flex-1 px-4 py-2.5 border border-l-0 border-gray-200 rounded-r-lg text-sm text-gray-500 truncate bg-gray-50">
                  {fileName}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-6 flex items-center justify-center bg-[#3d6691] text-white font-bold py-3.5 rounded-xl hover:bg-[#2c4b6b] focus:outline-none focus:ring-4 focus:ring-[#3d6691]/30 transition-all duration-300 shadow-lg shadow-blue-900/10 transform hover:-translate-y-0.5 ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-semibold text-[#3d6691] hover:text-[#2c4b6b] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
