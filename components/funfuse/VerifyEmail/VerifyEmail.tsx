import React, { useState } from 'react';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import Auth from '@firebase-client/client.config';
import { applyActionCode } from 'firebase/auth';
import { useRouter } from 'next/router';
import firebaseJson from '@jsons/firebase.json';
import useAbortableEffect from '@hooks/useAbortableEffect';
import Head from 'next/head';
import AppWrapper from '../hoc/AppWrapper';
import Link from 'next/link';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';

export default function LoginPage() {
  const { query } = useRouter();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { oobCode, mode, uid } = query as {
    mode: string;
    oobCode: string;
    uid: string;
  };

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
              fetch('/api/funfuse/auth/verify-user', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  uid,
                }),
              }).then((response) =>
                response
                  .json()
                  .then((data: IResponse) => {
                    if (data.error) {
                      setError(data.opsDetails.details);
                      console.log('Unable to Verify Email = ', data);
                    } else {
                      setSuccess('Email Verified Successfully. ');
                      setError('');
                      return;
                    }
                  })
                  .catch((error) => {
                    console.log('Error = ', error);
                    setError(
                      'Unable to verify Email. Failed to decode Server Response'
                    );
                  })
                  .catch((error) => {
                    setError('Unable to verify Email. Internal Server Error');
                    console.log('Error = ', error);
                  })
              );
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
              Auth.signOut();
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
      <AppWrapper
        topNavBarprops={{ headerText: 'Verify Email' }}
        childComponent={
          <div className='flex flex-col justify-center w-screen h-screen p-2'>
            <div className='h-[10rem] w-auto'>
              <ThemeLogo />
            </div>

            {isError ? (
              <label className='m-2 mt-4 text-red-400 font-funfuse'>
                {error}
              </label>
            ) : null}
            {isSuccess ? (
              <label className='m-2 mt-4 text-green-500 font-funfuse'>
                {success}

                <Link href='/funfuse/login' passHref>
                  <a className='underline cursor-pointer text-funfuse'>
                    Login Here.
                  </a>
                </Link>
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
        }
      />
    </React.Fragment>
  );
}
