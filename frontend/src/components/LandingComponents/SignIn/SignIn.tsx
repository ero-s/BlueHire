import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    console.log("Submitted: ", { username, password });
  };

  return (
    <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
      <div className="flex justify-center mb-6">
        <Link to="/">
          <Logo variant="lg" />
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Sign In to Your Account</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username</label>
          <input 
            id="username"
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter your password"
          />
        </div>
        <button 
          type="submit"
          className='w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md'
        >
          Sign In
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-8">
        Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
