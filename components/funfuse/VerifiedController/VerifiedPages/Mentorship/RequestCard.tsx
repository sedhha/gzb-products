import ImageCard from '@/components/funfuse/ImageCard/ImageCard';
import React from 'react';

type Props = {
  imageUrl: string;
  name: string;
  onCallAcceptHandler: () => void;
};

export default function RequestCard({
  imageUrl,
  name,
  onCallAcceptHandler,
}: Props) {
  return (
    <React.Fragment>
      <div className='flex w-full gap-2' aria-label='Funfuse-Message-Container'>
        <ImageCard imageUrl={imageUrl} />
        <div className='flex flex-col flex-auto w-full'>
          <div
            aria-label='Funfuse-Message-Header'
            className='flex flex-row items-center gap-2'>
            <h2 className='px-1 text-xl text-black'>{name ?? 'John Doe'}</h2>
          </div>
          <div
            aria-label='Funfuse-Message-Body'
            className='flex items-center justify-between w-full gap-2'>
            <label className='text-sm text-gray-400'>
              Hi, I wanted to have a mentorship session with you! Can we Connect
              now?
            </label>
            <div
              className='w-10 h-10 bg-funfuse_green funfuse-icons-check hover:scale-95'
              onClick={onCallAcceptHandler}
            />
            <div className='w-10 h-10 bg-funfuse_red funfuse-icons-cross hover:scale-95' />
          </div>
        </div>
      </div>
      <div className='w-full px-2 h-[0.02rem] bg-gray-500 my-2' />
    </React.Fragment>
  );
}
