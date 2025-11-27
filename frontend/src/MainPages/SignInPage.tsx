import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 
import Logo from '../MainComponents/LandingComponents/Logo/Logo';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted: ", { username, password });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 via-blue-200 to-bluehire-blue overflow-hidden">
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
        onClick={() => navigate('/landing')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-2 rounded-full shadow-md hover:bg-white/90 transition-all duration-200"
      >
        <ArrowLeft className="w-5 h-5 text-bluehire-blue" />
        <span className="hidden md:inline text-bluehire-blue font-medium">Back</span>
      </button>

      {/* --- Sign-In Card --- */}
      <div className="relative z-10 w-full max-w-md bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <Logo variant="lg" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Sign In to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluehire-blue focus:border-bluehire-blue transition duration-150 ease-in-out"
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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-bluehire-blue focus:border-bluehire-blue transition duration-150 ease-in-out"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-bluehire-blue text-white font-semibold py-3 rounded-lg hover:bg-bluehire-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bluehire-blue transition-all duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-bluehire-blue hover:opacity-80"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
