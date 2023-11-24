import React, { useContext, useState } from 'react';
import { HiUser, HiLockClosed } from "react-icons/hi";
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const {isAuthenticated, setIsAuthenticated  , loading, setLoading} = useContext(Context);
 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
          const { data } = await axios.post(
            `${server}/login`,
            {
              email,
              password
            },
            {
              headers: {
                "Content-Type": "application/json"
              },
              withCredentials: true
            }
          );
          toast.success(data.message);
          setIsAuthenticated(true);
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
          setIsAuthenticated(false);
          setLoading(false);
        }
    };

  if(isAuthenticated) return <Navigate to={"/"} />
 
  return (
    <div className='flex items-center justify-center h-[90vh]'>
       <div className=' text-center bg-transparent w-[450px] rounded-lg px-6 py-6
        border-2 border-solid border-white border-opacity-20 shadow-lg 
         shadow-gray-800 backdrop-filter backdrop-blur-md'>
         <form onSubmit={submitHandler}>
            <h1 className=' text-3xl font-bold'>Login</h1>
            <div className='items-center w-full h-[45px] my-7 relative 
            '>
                 <input type="text" placeholder='Email' name='email' value={email}
                onChange={(e) => setEmail(e.target.value)} required
               className='w-full h-full bg-transparent  outline-noneplaceholder-gray-400
                 text-md py-5 pl-6 pr-10
                border-2 border-solid border-white border-opacity-20 rounded-[40px]'/>
                <HiUser className='absolute right-5 top-3 text-xl'/>
            </div>
            <div className='relative items-center w-full h-[45px] my-7'>
                <input type='password' placeholder='Password' name='password' value={password}
                 onChange={(e) => setPassword(e.target.value)} required
                className='w-full h-full bg-transparent  outline-none placeholder-gray-400
                border-2 border-solid border-white border-opacity-20 rounded-[40px]  text-md py-5 pl-6 pr-10'/>
                <HiLockClosed className='absolute right-5 top-3 text-xl'/>
            </div>

            <button type='submit' disabled={loading}
            className='w-full bg-white text-[#333] font-bold rounded-[40px] outline-none'
            >Login</button>
            <div className='m-4 flex justify-center gap-2'>
                <p>Don't have account ?</p>
                <Link to="/register" className='font-semibold text-white hover:text-white hover:underline'>Register</Link>
            </div>
        </form>
       </div>
    </div>
  )
}

export default Login