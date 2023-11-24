import React, { useContext } from 'react';
import logo from './../assets/logo.png';
import { FaHome, FaUser,FaPowerOff } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  
  const logOutHandler = async () => {
     setLoading(true);
      try {
           await axios.get(
            `${server}/logout`,
            {
              withCredentials: true
            }
          );
          toast.success("Logging Out");
          setIsAuthenticated(false);
          setLoading(false);
        } catch (error) {
          if (error.response) {
            console.log("Server responded with a non-2xx status", error.response.data);
          } else {
            console.log("An error occurred while sending the request", error.message);
          }
          toast.error(error.response.data.message);
          setIsAuthenticated(true);
          setLoading(false);
        }
    };
  return (
    <div className='flex items-center p-3 rounded-lg md:p-4 shadow-lg 
            shadow-gray-800 justify-between backdrop-filter backdrop-blur-sm'>
       <div className='flex items-center gap-2'>
         <img src={logo} alt="logo" className='w-7 md:w-9'/>
        <h2 className=' text-lg md:text-2xl font-titleFont font-semibold'>QuotePanda</h2>
       </div>
       <div className='hidden md:flex gap-16 text-lg'>
           <Link to={"/"} className=' text-white hover:text-white' >Home</Link>
         
           { isAuthenticated ? 
           ( <Link disabled={loading}  onClick={logOutHandler} className='text-white hover:text-white bg-transparent p-0'>Logout</Link>) 
           : ( <Link to={"/login"} 
           className='text-white hover:text-white' 
           >Login</Link>)}
        
       </div>
         <div className='block md:hidden flex gap-5'>
           <Link to={"/"} className=' text-white hover:text-white' ><FaHome className=' text-lg'/></Link>
           { isAuthenticated ? (
             <Link disabled={loading} onClick={logOutHandler} className='text-white hover:text-white' > <FaPowerOff className=' text-md'/></Link>
           ) : (
             <Link to={"/login"} className='text-white hover:text-white' > <IoMdLogIn className=' text-xl'/></Link>
           )}
         </div>
    </div>
  )
}

export default Header