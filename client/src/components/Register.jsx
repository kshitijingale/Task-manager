import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoaderComponent from './LoaderComponent';

function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const BASE_URL = "https://taskbuddy-fzfd.onrender.com";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (userData.name.trim() === "" || userData.email.trim() === "" || userData.password.trim() === "") {
            alert("All fields are required")
            setLoading(false);
            return;
        }

        await axios.post(`${BASE_URL}/api/register`, userData, {
            withCredentials: true,
        })
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                navigate('/dashboard');
            }).catch((err) => {
                const errorMessage = err.response.data.message;
                alert(errorMessage)
                navigate('/register');
            })

        // Reset values
        setUserData({
            name: "",
            email: "",
            password: ""
        })
    }

    const handleInput = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const toLogin = () => {
        navigate('/')
    }

    return (
        <>
            {loading && <LoaderComponent />}

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex pt-40 sm:pt-0 sm:items-center justify-center">
                <div className="md:max-w-md md:w-full w-[90%] p-6 bg-white rounded-md shadow-md h-max">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">🎯 TaskBuddy </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                            <input value={userData.name} onChange={handleInput} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500" type="text" id="name" name="name" placeholder="Enter your name" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                            <input value={userData.email} onChange={handleInput} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500" type="email" id="email" name="email" placeholder="Enter your email" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                            <input value={userData.password} onChange={handleInput} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500" type="password" id="password" name="password" placeholder="Enter your password" />
                        </div>
                        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo">Register</button>
                    </form>

                    <p className="text-gray-600 text-sm mt-2">
                        Already have an account? <button onClick={toLogin} className="text-indigo-500">Log In</button>
                    </p>
                </div>
            </div>
        </>


    )
}

export default Register
