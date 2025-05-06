import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers, FaUserPlus } from "react-icons/fa6";
import { TbUniverse } from "react-icons/tb";

const SideBar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center  p-3 rounded-lg transition-all duration-300 font-medium gap-2 
     ${isActive 
       ? 'bg-gradient-to-r from-gray-300 via-white to-gray-300 text-black shadow-sm' 
       : 'text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-black'}`;

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Sidebar */}
      <aside className="w-64 backdrop-blur-sm bg-gradient-to-br from-gray-900 to-black p-6 border border-gray-800 shadow-2xl">
        {/* Decorative accent */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent mb-6"></div>
        
        <h1 className="text-2xl font-bold mb-8 text-white">My App</h1>
        
        <div className="w-12 h-1 mx-auto bg-gradient-to-r from-gray-600 via-white to-gray-600 rounded-full mb-6"></div>
        
        <nav className="space-y-4">
          <NavLink to="/Dashboard" className={linkStyle}>
            <MdSpaceDashboard /> Dashboard
          </NavLink>
          <NavLink to="/Allcharacters" className={linkStyle}>
            <FaUsers /> Characters
          </NavLink>
          <NavLink to="/Createcharacter" className={linkStyle}>
            <FaUserPlus /> Create Character
          </NavLink>
          <NavLink to="/createunivers" className={linkStyle}>
            <TbUniverse /> Create Univers
          </NavLink>
        </nav>
        
        {/* Bottom accent */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-6"></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gradient-to-br from-black via-gray-900 to-black overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default SideBar