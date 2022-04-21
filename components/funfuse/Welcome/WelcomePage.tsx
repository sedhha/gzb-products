import React from 'react';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FullWidthImage from '@/components/funfuse/FullWidthImage/FullWidthImage';
import ThemeButton from '@/components/funfuse/Buttons/ThemeButton/ThemeButton';
export default function WelcomePage() {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        <title>Funfuse</title>
      </Head>
      <div className='flex flex-col justify-center w-screen h-screen p-2'>
        <div className='h-[10rem] w-auto'>
          <ThemeLogo />
        </div>

        <div className='h-[20rem] w-auto py-0 px-2'>
          <FullWidthImage
            alt='Funfuse Home'
            priority
            src='/funfuse/homepage.svg'
          />
        </div>

        <ThemeButton
          buttonText={'Register'}
          twClass='w-3/4 mx-auto text-xl mb-3'
          buttonCallback={() => router.push('/funfuse/register')}
        />
        <ThemeButton
          buttonText={'Login'}
          twClass='w-3/4 mx-auto text-xl'
          buttonCallback={() => router.push('/funfuse/login')}
        />
      </div>
    </React.Fragment>
  );
}
