import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Logo from "../MainComponents/LandingComponents/Logo/Logo";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // New states for error handling and loading
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // --- 1. HARDCODED ADMIN CHECK ---
    // Check for specific admin credentials before calling API
    if (username === "bluehire" && password === "codeblooded") {
      // Create a mock admin user for LocalStorage so the Header works
      const adminUser = {
        id: "admin-master",
        username: "bluehire",
        role: "ADMIN",
        name: "Admin", // This will show in the Header
      };

      localStorage.setItem("currentUser", JSON.stringify(adminUser));

      // Navigate to the Admin Dashboard route
      navigate("/Admin");
      return; // Stop execution here, do not call API
    }

    // --- 2. STANDARD API LOGIN ---
    try {
      // We send the username and password to the backend
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();

        // 1. Save user info to LocalStorage (so other pages know who is logged in)
        localStorage.setItem("currentUser", JSON.stringify(user));

        // 2. Check Role and Navigate
        // Ensure role string matches your database (e.g., "CLIENT", "WORKER")
        const role = user.role ? user.role.toUpperCase() : "";

        if (role === "CLIENT") {
          navigate("/client");
        } else if (role === "WORKER") {
          navigate("/worker");
        } else {
          // Fallback if role is missing or generic dashboard
          navigate("/dashboard");
        }
      } else {
        // Handle 401 Unauthorized or 404 Not Found
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-[#3d6691] overflow-hidden">
      {/* --- Background Design --- */}
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
        <ArrowLeft className="w-5 h-5 text-[#3d6691]" />
        <span className="hidden md:inline text-[#3d6691] font-medium">
          Back
        </span>
      </button>

      {/* --- Sign-In Card --- */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <Logo variant="lg" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Welcome back to BlueHire
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(null); // Clear error on type
              }}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3d6691] focus:border-[#3d6691] outline-none transition duration-150 ease-in-out disabled:bg-gray-100"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#3d6691] focus:border-[#3d6691] outline-none transition duration-150 ease-in-out disabled:bg-gray-100"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center bg-[#3d6691] text-white font-semibold py-3 rounded-lg hover:bg-[#2c4b6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3d6691] transition-all duration-300 shadow-md ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#3d6691] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;