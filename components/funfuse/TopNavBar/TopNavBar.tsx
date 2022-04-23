import React from 'react';
import FullWidthImage from '@/components/funfuse/FullWidthImage/FullWidthImage';
import { HeaderProps } from '@constants/interfaces/funfuse/frontend/ui-props/TopNavBar.interfaces';

export default function TopNavBar({
  headerText,
  imageRef,
  username,
}: HeaderProps) {
  return (
    <div className='flex flex-row items-center justify-between w-full px-2 py-3 bg-funfuse'>
      <h2 className='p-0 m-0 text-2xl text-white font-funfuse '>
        {headerText}
      </h2>
      <div className='relative w-12 h-12'>
        <FullWidthImage
          src={imageRef ?? '/funfuse/avatar.png'}
          alt={username ?? 'User Avatar'}
          containerDivClass='border border-gray-100 rounded-full shadow-sm overflow-hidden'
        />
        {/* {<div className='absolute top-0 right-0 w-3 h-3 my-1 bg-green-400 border-2 border-white rounded-full z-2'></div>} */}
      </div>
    </div>
  );
}
