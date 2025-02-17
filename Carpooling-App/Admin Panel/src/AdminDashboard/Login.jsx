import axios from 'axios';
import React from 'react'
import { AppRoutes } from '../constant/Constant';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const handleSignin = async (e) => {
        e.preventDefault()
        try {
            const obj = {
                email : e.target.email.value,
                password : e.target.password.value,
            }
            const res = await axios.post(AppRoutes.login , obj)
            const token = res.data.data.token
            console.log(token);
            
            navigate("/dashboard")
            Cookies.set("token", token, {expires : 7})
             console.log(res)
            } catch (error) {
                alert(error.message)
                console.log(error.message)


        }        
    }
    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center  mx-auto md:h-screen lg:py-0">
                    <img
                        className="w-30"
                        src="src\assets\logo.png"
                        alt="logo"
                    />
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-2 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-green-600 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handleSignin} className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-purple-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-purple-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <button type='submit'  className='btn p-2 cursor-pointer w-full text-center items-center rounded-2xl  bg-green-600 mx-auto text-white'>Signin</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login