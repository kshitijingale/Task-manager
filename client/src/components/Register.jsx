import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const navigate = useNavigate();

    const BASE_URL = "https://taskbuddy-fzfd.onrender.com";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.name.trim() === "" || userData.email.trim() === "" || userData.password.trim() === "") {
            alert("All fields are required")
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
            {/* <div className='mx-auto w-[440px] flex align-center flex-col my-[20px] px-[10px]'>
                <h1 className='text-[40px] text-center mb-[20px]'>Register Account</h1>
                <form className='flex flex-col gap-[20px] max-w-[400px]' onSubmit={handleSubmit}>
                    <input name='name' value={userData.name} onChange={handleInput} className='focus:outline-none p-[6px] border border-[#000] rounded' type='text' placeholder='Enter your name' />
                    <input name='email' value={userData.email} onChange={handleInput} className='focus:outline-none p-[6px] border border-[#000] rounded' type='email' placeholder='Enter your email' />
                    <input name='password' value={userData.password} onChange={handleInput} className='focus:outline-none p-[6px] border border-[#000] rounded' type='password' placeholder='Enter your password' />
                    <button type='submit' className="text-white text-[20px] bg-[#000000] border border-transparent py-1 px-6 focus:outline-none hover:bg-transparent hover:text-black hover:border-black rounded">Register</button>
                    <button onClick={toLogin} className="text-[#000] text-[20px] bg-transparent border border-[#000] py-1 px-6 focus:outline-none hover:bg-[#000] hover:text-[#fff] hover:border-transparent rounded">Already have an account</button>
                </form>
            </div> */}
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
