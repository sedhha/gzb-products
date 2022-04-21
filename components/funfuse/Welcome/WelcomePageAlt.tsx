import React, { useEffect } from 'react';
import classes from './WelcomePage.module.scss';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import FullWidthImage from '../FullWidthImage/FullWidthImage';
import ThemeButton from '@/components/funfuse/Buttons/ThemeButton/ThemeButton';
export default function WelcomePage() {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>Funfuse</title>
      </Head>
      <div className={classes.MobileLayout}>
        <div className='flex flex-col justify-center w-full h-screen border align-center border-sky-500'>
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

          <ThemeButton
            buttonText={'Register'}
            twClass='w-3/4 mx-auto text-4xl mb-3'
            buttonCallback={() => null}
          />
          <ThemeButton
            buttonText={'Login'}
            twClass='w-3/4 mx-auto text-4xl'
            buttonCallback={() => null}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
