import React, { useState } from 'react'
import axios from 'axios'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading,setLoading] = useState(false)

  const BASE_URL = process.env.REACT_APP_BASE_URL

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(`${BASE_URL}/signup`, user)
      console.log('Signup successfull:', response.data)
      navigate('/Login')
      setUser({name: '',
        email: '',
        password: ''})
        setLoading(false)
        toast.success("Signup successfully", {
            style: {
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(33,33,33,0.95) 0%, rgba(66,66,66,0.95) 100%)',
              color: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset',
              backdropFilter: 'blur(4px)',
              padding: '12px 16px',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#000',
            },
            duration: 3000,
          })
    } catch (err) {
      setLoading(false)
        toast.error(err.response?.data?.message || "Signup failed", {
            style: {
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(60,0,0,0.95) 0%, rgba(120,0,0,0.95) 100%)',
              color: '#fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset',
              backdropFilter: 'blur(4px)',
              padding: '12px 16px',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#800',
            },
            duration: 4000,
          })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <Toaster 
        position="top-right"
        toastOptions={{
          // Default options for all toasts
          className: '',
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, rgba(33,33,33,0.95) 0%, rgba(66,66,66,0.95) 100%)',
            color: '#fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
            backdropFilter: 'blur(4px)',
          },
        }}
      />
      
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-gray-600 to-transparent rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-br from-gray-400 to-transparent rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      <form
        onSubmit={handleSubmit}
        className="relative z-10 backdrop-blur-sm bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 border border-gray-800"
      >
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2">Create Account</h2>
        
        <div className="w-12 h-1 mx-auto bg-gradient-to-r from-gray-600 via-white to-gray-600 rounded-full mb-6"></div>

        <div className="relative group">
          <div className="absolute left-3 top-3 text-gray-400 group-hover:text-white transition-colors duration-300">
            <AiOutlineUser />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-800 to-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder-gray-500 transition-all duration-300"
            required
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-white group-hover:w-full transition-all duration-300"></div>
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-3 text-gray-400 group-hover:text-white transition-colors duration-300">
            <AiOutlineMail />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-gradient-to-r from-gray-800 to-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder-gray-500 transition-all duration-300"
            required
          />
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-white group-hover:w-full transition-all duration-300"></div>
        </div>

        <div className="relative group">
          <div className="absolute left-3 top-3 text-gray-400 group-hover:text-white transition-colors duration-300">
            <AiOutlineLock />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 bg-gradient-to-r from-gray-800 to-black text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder-gray-500 transition-all duration-300"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-xl text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-500 to-white group-hover:w-full transition-all duration-300"></div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-gray-300 via-white to-gray-300 text-black py-3 rounded-lg hover:from-white hover:to-gray-200 transition-all duration-300 font-medium mt-4 shadow-sm hover:shadow-white/20"
        >
          
          {loading ?"Signing up..." :"Sign up"}
        </button>
        
        <div className="pt-4 text-center">
          <p className="text-gray-400 text-sm">
            Already have an account? 
            <Link to="/Login"><span className="text-white hover:text-gray-200 transition-colors"> Log In</span></Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup