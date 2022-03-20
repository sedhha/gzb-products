import React from 'react';
import Image from 'next/image';

export default function Header() {
  return (
    <React.Fragment>
      <div className='image-container'>
        <Image
          src={'/gcorn/gcorn-logo.svg'}
          alt={'gcorn-logo'}
          layout='fill'
          objectFit='contain'
          priority
        />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='pb-1 m-0 text-6xl italic text-gcorn_p font-gcorn_f'>
          gCorn!
        </h1>
        <p className='p-0 m-0 text-2xl italic text-gcorn_p font-gcorn_f'>
          A Corner for Geeks
        </p>
      </div>
    </React.Fragment>
  );
}
