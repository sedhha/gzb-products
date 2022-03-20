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
        <title>gCorn: Register</title>
        <link rel='icon' href='/gcorn/gcorn-logo.svg' />
      </Head>
      <main className={classes.mainSection}>
        <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      </main>
    </React.Fragment>
  );
}
