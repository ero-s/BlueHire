import React, { useState, useRef } from 'react';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        role: ""
    });
    const [image, setImage] = useState<File | null>(null);
    const [fileName, setFileName] = useState("No file chosen");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        <div className='flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden'>
            <div className="md:w-1/3 bg-blue-600 text-white p-8 flex flex-col justify-center items-center text-center">
                <Link to="/">
                    <Logo variant="lg" />
                </Link>
                <div className="mt-8">
                    <h1 className="text-3xl font-bold">Welcome!</h1>
                    <p className="mt-4 text-blue-100">
                        Create your BlueHire account to start connecting with opportunities that match your needs.
                    </p>
                </div>
            </div>

            <div className="md:w-2/3 p-8 md:p-12">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Create An Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input name="username" type="text" value={formData.username} onChange={handleChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input name="password" type="password" value={formData.password} onChange={handleChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select name="role" value={formData.role} onChange={handleChange} required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
                            <option value="">Select Role</option>
                            <option value="worker">Worker</option>
                            <option value="client">Client</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Government ID</label>
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
                    <button type="submit" className='w-full mt-6 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-md'>
                        Register
                    </button>
                </form>
                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account? <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
