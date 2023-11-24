import React from 'react'

const Loader = () => {
  return (
     <div className='flex items-center justify-center h-[90vh] flex-col gap-3'>
     <div className='text-center flex-col gap-5 bg-transparent md:w-[450px] rounded-lg p-9
    border-2 border-solid border-white border-opacity-20 shadow-lg 
    shadow-gray-800 flex items-center justify-center backdrop-filter backdrop-blur-md'>
    <h2 className='font-bold text-3xl'>Login First</h2>
    </div>
    </div>
  )
}

export default Loader
