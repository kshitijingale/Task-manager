import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const BASE_URL = "https://taskbuddy-fzfd.onrender.com";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.email.trim() === "" || userData.password.trim() === "") {
            alert("All fields are required")
            return;
        }


        await axios.post(`${BASE_URL}/api/login`, userData, {
            withCredentials: true,
        })
            .then(async (res) => {
                localStorage.setItem('token', res.data.token)
                navigate('/dashboard');
            }).catch((err) => {
                const errorMessage = err.response.data.message;
                alert(errorMessage)
                navigate('/register');
            })

        // Reset values
        setUserData({
            email: "",
            password: ""
        })
    }

    const handleInput = (e) => {
        setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const toRegister = () => {
        navigate('/register')
    }

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center">
            <div className="md:max-w-md md:w-full w-3/4  p-6 bg-white rounded-md shadow-md">
                <h2 className="text-3xl md:text-4xl font-bold  mb-6">🎯 TaskBuddy </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500" type="email" value={userData.email} id="email" name="email" onChange={handleInput} placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input value={userData.password} onChange={handleInput} className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500" type="password" id="password" name="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo">Log In</button>
                </form>
                <p className="text-gray-600 text-sm mt-2">
                    Demo Email: demo@example.com <br />
                    Demo Password: demo123
                </p>
                <button onClick={toRegister} className="text-indigo-500 mt-4 block">Don't have an account</button>
            </div>
        </div>

    )
}
export default Login
