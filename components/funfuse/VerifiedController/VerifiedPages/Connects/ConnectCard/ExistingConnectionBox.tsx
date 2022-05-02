import ImageCard from '@/components/funfuse/ImageCard/ImageCard';
import React from 'react';

type Props = {
  imageUrl?: string;
  userName: string;
  bio: string;
};

export default function ConnectionBox({ imageUrl, userName, bio }: Props) {
  const newMsgValue = bio.length > 60 ? `${bio.slice(0, 60)}...` : bio;
  return (
    <React.Fragment>
      <div className='flex w-full gap-2' aria-label='Funfuse-Message-Container'>
        <ImageCard imageUrl={imageUrl} />
        <div className='flex flex-col flex-auto w-full'>
          <div
            aria-label='Funfuse-Message-Header'
            className='flex flex-row items-center gap-2 mt-1'>
            <h2 className='px-1 text-xl text-black'>
              {userName ?? 'John Doe'}
            </h2>
          </div>
          <div
            aria-label='Funfuse-Message-Body'
            className='flex items-center justify-between w-full'>
            <label className='text-sm text-gray-400'>{newMsgValue}</label>
            <div className='p-1 rounded-sm bg-funfuse'>
              <div className='w-4 h-4 bg-white funfuse-icons-send hover:scale-95' />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full px-2 h-[0.02rem] bg-gray-500 my-2' />
    </React.Fragment>
  );
}
