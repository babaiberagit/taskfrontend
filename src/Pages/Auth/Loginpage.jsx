import React, { useEffect, useState } from 'react'
import loginImage from '../../Assets/img/studycartoon.webp'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../Utils/Element';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserId } from '../../Redux/Action';

const Loginpage = () => {
    const navigation = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const mytoken = useSelector((e) => e.token);

    useEffect(() => {
        if (mytoken) {
            // Redirect if user is already authenticated
            navigation('/home');
        }
    }, [mytoken, navigation]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/user/login`, {
                email,
                password,
            });

            if (response.data.success) {
                navigation("/home");
                dispatch(setToken(response.data.token));
                dispatch(setUserId(response.data.id));

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Signup failed. Please try again.');
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="flex w-full max-w-4xl">
                <div className="hidden md:flex  items-center justify-center">
                    <img src={loginImage} alt="Login Illustration" className="" />
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg w-96">
                        <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
                        <form onSubmit={handleLogin}>
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
                                Login
                            </button>
                        </form>
                        <p className="text-center text-gray-600 mt-4">
                            Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loginpage