import React, { useState, useRef } from "react";
import Logo from "../MainComponents/LandingComponents/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // 👈 Lucide icon for back button

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Submitted: ", { ...formData, image });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* --- Background Design --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-bluehire-blue"></div>

      <div
        className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-blue-300/40 rounded-3xl rotate-12"
        style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }}
      ></div>

      <div
        className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-blue-500/30 rounded-3xl -rotate-12"
        style={{ clipPath: "polygon(30% 0, 100% 10%, 100% 90%, 0 100%)" }}
      ></div>

      <div
        className="absolute bottom-0 left-1/3 w-[600px] h-[300px] bg-blue-400/20 rounded-3xl rotate-3"
        style={{ clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 100%)" }}
      ></div>

      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      {/* --- Back Button --- */}
      <button
        onClick={() => navigate("/landing")}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-2 rounded-full shadow-md hover:bg-white/90 transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5 text-bluehire-blue" />
        <span className="hidden md:inline text-bluehire-blue font-medium">Back</span>
      </button>

      {/* --- Sign Up Card --- */}
      <div className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Left Section */}
        <div className="relative md:w-1/3 bg-bluehire-blue text-white p-8 flex flex-col items-center text-center overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/3 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)" }}
          ></div>

          <div className="relative z-10 flex flex-col h-full justify-around mb-32 items-center">
            <Link to="/" className="block">
              <Logo variant="lg" />
            </Link>

            <div className="my-4">
              <h1 className="text-3xl font-bold lg:mt-0 mt-24 ">Welcome!</h1>
              <p className="mt-4 text-gray-200">
                Create your account to start connecting with opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="md:w-2/3 p-8 md:p-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Create An Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluehire-blue focus:border-bluehire-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluehire-blue focus:border-bluehire-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluehire-blue focus:border-bluehire-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluehire-blue focus:border-bluehire-blue bg-white"
              >
                <option value="">Select Role</option>
                <option value="worker">Worker</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
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
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Upload File
                </button>
                <span className="flex-1 p-2 border border-l-0 border-gray-300 rounded-r-lg text-sm text-gray-500 truncate">
                  {fileName}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-bluehire-blue text-white font-semibold py-3 rounded-lg hover:bg-bluehire-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bluehire-blue transition-all duration-300 shadow-md"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-bluehire-blue hover:opacity-80"
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
