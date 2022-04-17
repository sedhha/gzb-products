import React, { useState } from 'react';
import classes from './VerifyEmail.module.scss';
import WhiteLogo from '@/components/funfuse/Logos/WhiteLogo';
import Auth from '@firebase-client/client.config';
import { applyActionCode } from 'firebase/auth';
import { useRouter } from 'next/router';
import firebaseJson from '@jsons/firebase.json';
import useAbortableEffect from '@hooks/useAbortableEffect';
import Head from 'next/head';

export default function LoginPage() {
  const { query } = useRouter();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { oobCode, mode } = query as { mode: string; oobCode: string };

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
      <div className={classes.Card}>
        <div className={classes.LogoHeight}>
          <WhiteLogo />
        </div>
        {error !== '' && (
          <label className='text-center text-red-600'>{error}</label>
        )}
        {success !== '' && (
          <label className='text-center text-lime-600'>{success}</label>
        )}
        {success === '' && error === '' && (
          <label className='text-center text-white'>Please Wait...</label>
        )}
        <br />
        <br />
        <br />
      </div>
    </React.Fragment>
  );
}
