import Image from 'next/image';
import React from 'react';

export default function HomePage() {
  return (
    <div className='block h-full min-w-0 p-2 m-2'>
      <div className='flex flex-row items-center justify-around gap-2 overflow-hidden'>
        <div className='flex-auto drop-shadow-xl'>
          <input className='w-full p-0.5 border-t-gray-200 border-2 outline-none font-funfuse' />
        </div>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div className='funfuse-icons-search h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
      <div className='flex flex-col items-center gap-2 mt-2'>
        <div className='flex gap-2 border border-red-400'>
          <div className='h-[5rem] w-[5rem] border border-black'></div>
          <div aria-label='Message Container' className='flex flex-col'>
            <div className='flex flex-row items-center gap-1'>
              <h3 className='text-xl font-bold text-black font-funfuse'>
                John Doe
              </h3>
              <div className='w-[1.5rem] h-[1.5rem] rounded-full bg-funfuse flex justify-center items-center'>
                <label className='p-0 m-0 text-sm text-white'>5</label>
              </div>
            </div>
            <label>
              We have 12 text messages from John Doe. Click here to reply
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
