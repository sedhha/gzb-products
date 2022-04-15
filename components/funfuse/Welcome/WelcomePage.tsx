import React from 'react';
import classes from './WelcomePage.module.scss';
import WhiteLogo from '@/components/funfuse/Logos/WhiteLogo';
import WhiteButton from '@/components/funfuse/Buttons/WhiteButton/WhiteButton';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
export default function WelcomePage() {
  return (
    <div className={classes.Card}>
      <div className='flex flex-row justify-center w-full p-0 m-0 text-center gap-x-4'>
        <WhiteButton icon={<FiLogIn className={classes.ActionIcon} />} />
        <WhiteButton
          icon={<AiOutlinePlus className={classes.ActionIconLarge} />}
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
