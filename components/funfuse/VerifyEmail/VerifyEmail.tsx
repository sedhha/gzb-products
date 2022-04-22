import React, { useState } from 'react';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import Auth from '@firebase-client/client.config';
import { applyActionCode } from 'firebase/auth';
import { useRouter } from 'next/router';
import firebaseJson from '@jsons/firebase.json';
import useAbortableEffect from '@hooks/useAbortableEffect';
import Head from 'next/head';
import TopNavBar from '../TopNavBar/TopNavBar';

export default function LoginPage() {
  const { query } = useRouter();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { oobCode, mode } = query as { mode: string; oobCode: string };

  const isError = error !== '';
  const isSuccess = success !== '';

  useAbortableEffect(
    (mounted) => {
      if (oobCode) {
        if (mode !== 'verifyEmail' && mounted) {
          setSuccess('');
          setError('Only Email Verification Supported');
          return;
        }
        applyActionCode(Auth, oobCode)
          .then(() => {
            if (mounted) {
              console.log('Success');
              setSuccess('Email Verified Successfully Go Back to Login Page');
              setError('');
              return;
            }
          })
          .catch((error) => {
            console.log('Error = ', error);
            if (mounted) {
              setError(
                firebaseJson.errors[
                  error.code as keyof typeof firebaseJson.errors
                ]
              );
              setSuccess('');
              return;
            }
          });
      }
    },
    [query.oobCode]
  );
  return (
    <React.Fragment>
      <Head>
        <title>Funfuse: Verify Email</title>
      </Head>
      <TopNavBar headerText={'Verify Email'} />
      <div className='flex flex-col justify-center w-screen h-screen p-2'>
        <div className='h-[10rem] w-auto'>
          <ThemeLogo />
        </div>

        {isError ? (
          <label className='m-2 mt-4 text-red-400 font-funfuse'>{error}</label>
        ) : null}
        {isSuccess ? (
          <label className='m-2 mt-4 text-green-500 font-funfuse'>
            {success}
          </label>
        ) : null}
        {!isError && !isSuccess ? (
          <React.Fragment>
            <div className='w-16 h-16 mx-auto mt-8 border-b-2 rounded-full border-funfuse animate-spin' />
            <label className='m-2 mx-auto mt-4 text-funfuse font-funfuse'>
              Trying to Verify your Email...
            </label>
          </React.Fragment>
        ) : null}
      </div>
    </React.Fragment>
  );
}
