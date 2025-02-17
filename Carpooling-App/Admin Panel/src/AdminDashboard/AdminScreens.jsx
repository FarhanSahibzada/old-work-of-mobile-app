import React from "react";
import { Outlet, useNavigate } from "react-router";
import { FaCar, FaRegUser } from 'react-icons/fa';
import Navbar from "./Navbar.jsx"
import { MdOutlineDashboardCustomize, MdOutlinePedalBike } from 'react-icons/md';



function Adminscreens() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-800 flex flex-col md:flex-row shadow gap-3">
      {/********************     Side block    ***************************/}
      <div className="w-full md:w-1/6">
          <ul className='text-center space-y-5 text-white p-4'>
          <li className='flex justify-center items-center gap-2'>
            <MdOutlineDashboardCustomize className='w-6'/>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full text-left  hover:bg-gray-700 cursor-pointer transition"
            >
              Dashboard
            </button>
          </li>
          <li className='flex justify-center items-center gap-2'>
          <FaRegUser className='w-6'/>
            <button
              onClick={() => navigate('/userlist')}
              className="w-full text-left hover:bg-gray-700 cursor-pointer transition"
            >
              Users
            </button>
            </li>
            <li className='flex justify-center items-center gap-2'>
          <FaCar className="w-6"/>
            <button
              onClick={() => navigate('/driver')}
              className="w-full text-left hover:bg-gray-700 cursor-pointer transition"
            >
              Active Drive
            </button>
          </li>
          <li className='flex justify-center items-center gap-2'>
          <FaCar className="w-6"/>
            <button
              onClick={() => navigate('/driverlist')}
              className="w-full text-left hover:bg-gray-700 cursor-pointer transition"
            >
              Driver List
            </button>
          </li>
        </ul>
        
       
      </div>


      <div className="flex flex-col flex-end w-full md:w-5/6 bg-blue-50">
        <Outlet />
      </div>
      </div>
      </>
  );
}

export default Adminscreens;