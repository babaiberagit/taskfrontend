import React, { useState } from 'react';
import loginImage from '../../Assets/img/studycartoon.webp';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../Utils/Element';

const Signup = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/user/signup`, {
                userName,
                email,
                password,
            });

            if (response.data.success) {
                navigate("/home");
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Signup failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
                    <img src={loginImage} alt="Signup Illustration" className="object-cover h-full w-full" />
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
                    <form onSubmit={handleSignup} className="w-full max-w-xs">
                        <div className="mb-4">
                            <label className="block text-gray-700">Username</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Signup
                        </button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account? <Link to="/" className="text-blue-500">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
