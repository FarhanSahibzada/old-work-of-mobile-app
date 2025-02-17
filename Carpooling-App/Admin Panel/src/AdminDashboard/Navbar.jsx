import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = async (e) => {
        Cookies.remove("token")
        navigate("/")
    }
    return (
        <div className='flex p-3 justify-between'>
            <div>
                <h1 className='md:text-3xl font-bold text-green-700'>
CarPool                </h1>
            </div>
            <div>
                <button className='btn cursor-pointer border bg-slate-900 text-white font-bold w-20 h-10 rounded-2xl'
                onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar