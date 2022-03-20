import React from 'react';
import Head from 'next/head';
import classes from '../Home.module.scss';
import Image from 'next/image';
import InputBox from '../../common/Inputs/InputBox';
import AppConstants from '../global/constants/constants';
import OutlineButton from '@/components/common/Buttons/OutlineButton';
export default function GCornHomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>gCorn: A Corner for Geeks</title>
        <link rel='icon' href='/gcorn/gcorn-logo.svg' />
      </Head>
      <main className={classes.mainSection}>
        <div className={'image-container'}>
          <Image
            src={'/gcorn/gcorn-logo.svg'}
            alt={'gcorn-logo'}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className={classes.WrapperDiv}>
          <h1 className={classes.Header}>gCorn!</h1>
          <p className={classes.Tagline}>A Corner for Geeks</p>
        </div>
        <br />
        <InputBox
          placeholder={'Email Address'}
          outlineColor={AppConstants.THEME_GREEN}
        />
        <InputBox
          placeholder={'Password'}
          type='password'
          outlineColor={AppConstants.THEME_GREEN}
        />
        <br />
        <OutlineButton outlineColor={AppConstants.THEME_GREEN}>
          Sign In
        </OutlineButton>
      </main>
    </React.Fragment>
  );
}
