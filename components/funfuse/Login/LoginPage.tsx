import React from 'react';
import classes from './LoginPage.module.scss';
import WhiteLogo from '@/components/funfuse/Logos/WhiteLogo';
import WhiteButton from '@/components/funfuse/Buttons/WhiteButton/WhiteButton';
import InputBox from '@/components/common/Inputs/InputBox';

export default function LoginPage() {
  return (
    <div className={classes.Card}>
      <div className={classes.LogoHeight}>
        <WhiteLogo />
      </div>
      <label className={classes.TagLine}>
        Fuse in to small business communities and grow together!
      </label>
      <InputBox
        placeholder={'Email Address'}
        type={'email'}
        outlineColor={'#fff'}
        className='mx-4 text-white'
      />
      <InputBox
        placeholder={'Password'}
        type={'password'}
        className='mx-4 text-white'
        outlineColor={'#fff'}
      />
      <div className={'mt-4 text-center'}>
        <WhiteButton
          icon={<div className={classes.LoginButton}>Login</div>}></WhiteButton>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
}
