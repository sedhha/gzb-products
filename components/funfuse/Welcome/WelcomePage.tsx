import React from 'react';
import classes from './WelcomePage.module.scss';
import WhiteLogo from '@/components/funfuse/Logos/WhiteLogo';
import WhiteButton from '@/components/funfuse/Buttons/WhiteButton/WhiteButton';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRouter } from 'next/router';
export default function WelcomePage() {
  const router = useRouter();
  return (
    <div className={classes.Card}>
      <div className='flex flex-row justify-center w-full p-0 m-0 text-center gap-x-4'>
        <WhiteButton
          icon={
            <FiLogIn
              className={classes.ActionIcon}
              onClick={() => router.push('/funfuse/login')}
            />
          }
        />
        <WhiteButton
          icon={
            <AiOutlinePlus
              className={classes.ActionIconLarge}
              onClick={() => router.push('/funfuse/register')}
            />
          }
        />
      </div>
      <div className={classes.LogoHeight}>
        <WhiteLogo />
      </div>
      <label className={classes.TagLine}>
        Fuse in to small business communities and grow together!
      </label>
      <br />
    </div>
  );
}
