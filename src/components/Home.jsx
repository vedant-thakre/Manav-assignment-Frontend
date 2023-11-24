import React, { useContext, useEffect, useState } from 'react';
import { LuTwitter } from "react-icons/lu";
import { GrFormNext } from "react-icons/gr";
import { MdContentCopy } from "react-icons/md";
import axios from 'axios';
import { Context } from '../main';
import { Navigate } from 'react-router';
import Loader from './Loader';
import toast from 'react-hot-toast';

const Home = () => {
    const [copy, setcopy] = useState(false);
    const {user , isAuthenticated, loading} = useContext(Context);
    const [quote, setQuote] = useState({
        text : "If you have dream to chase nothing can stop you",
        author : "Leonel Messi",
    })
    const getQuotes = async () => {
        try {
            const response = await axios("https://api.quotable.io/random");
            const { content, author } = response.data;
            setQuote({
                text: content,
                author: author,
        });
        } catch (error) {
            console.log(error.message);
        }
    }

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text="${quote.text}"%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
        %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20
        %20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20-${quote.author}`);
    }

    const copyText = () => {
    const textToCopy = quote.text;
    setcopy(true);

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;

    document.body.appendChild(textarea);
    textarea.select();

    document.execCommand('copy');
    document.body.removeChild(textarea);
}

useEffect(() => {
    // This will be called after the component has been rendered.
    const timeoutId = setTimeout(() => {
        setcopy(false);
    }, 1500);

    // Cleanup the timeout on component unmount or if the effect is re-run.
    return () => clearTimeout(timeoutId);
}, [copy]); // Make sure to include `copy` in the dependency array.

if (!isAuthenticated){
  toast.error("Login first");
  return <Navigate to={"/login"} />;
}
  return (
   <div className='flex items-center justify-center h-[90vh] flex-col gap-3'>
  <div className='text-center flex-col gap-5 bg-transparent md:w-[450px] rounded-lg px-6 pt-6 pb-3
    border-2 border-solid border-white border-opacity-20 shadow-lg 
    shadow-gray-800 flex items-center justify-center backdrop-filter backdrop-blur-md'>
    <div className='flex flex-col gap-4 text'>
      <h2 className='text-[21px] md:text-2xl font-semibold '>{`"${quote.text}"`}</h2>
    </div> 
    <div className='w-full h-[1px] bg-white'></div>
    <div className='flex items-center justify-between w-full'>
      <h2 className='text-[14px] md:text-[16px] font-medium'>{`- ${quote.author}`}</h2>
      <div className='flex gap-3'>
        <div className='p-1.5 border-solid border-white border-2 rounded-[50%] 
          cursor-pointer hover:bg-white hover:text-gray-700'>
          <MdContentCopy className=' text-xl ' onClick={copyText}/> 
        </div>
        <div className='p-1.5 border-solid border-white border-2 rounded-[50%] 
          cursor-pointer hover:bg-white hover:text-gray-700'>
          <LuTwitter className=' text-xl ' onClick={shareOnTwitter}/> 
        </div>
        <div className='p-1.5 border-solid border-white border-2 rounded-[50%] 
          cursor-pointer hover:bg-white hover:text-gray-700'>
          <GrFormNext className=' text-xl' onClick={getQuotes}/>
        </div>
      </div>
    </div>
  </div>
    <div className='h-[28px]  '>
        {copy &&  <div className='py-[3px] px-[8px] bg-white rounded-md'>
            <p className='text-[12px] text-black font-medium'>Copied</p></div>}
    </div>
</div>

  )
}

export default Home