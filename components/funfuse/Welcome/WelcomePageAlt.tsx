import React, { useEffect } from 'react';
import classes from './WelcomePage.module.scss';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import WhiteButton from '@/components/funfuse/Buttons/WhiteButton/WhiteButton';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import FullWidthImage from '../FullWidthImage/FullWidthImage';
export default function WelcomePage() {
  const router = useRouter();
  console.log('CCC');

  return (
    <React.Fragment>
      <Head>
        <title>Funfuse</title>
      </Head>
      <div className={classes.MobileLayout}>
        <div className='flex flex-col justify-center w-full h-screen border border-sky-500'>
          <div className='h-[30rem] w-auto py-0 px-4'>
            <ThemeLogo />
          </div>
          <div className='h-[30rem] w-auto py-0 px-2'>
            <FullWidthImage
              alt='Funfuse Home'
              priority
              src='/funfuse/homepage.svg'
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
