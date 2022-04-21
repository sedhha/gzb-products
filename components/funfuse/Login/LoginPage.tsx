import React, { useState } from 'react';
import Auth from '@firebase-client/client.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '@redux-slices/user';
import { useAppDispatch } from '@redux-tools/hooks';
import Head from 'next/head';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import ThemeInputBox from '@/components/common/Inputs/ThemeInputBox';
import { FirebaseError } from 'firebase/app';
import ThemeButton from '../Buttons/ThemeButton/ThemeButton';
import { firebaseErrorTranslater } from '@firebase-server/public/errorTranslator';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const errorHandler = (error: FirebaseError) => {
    console.log('Error while logging in = ', error);
    if (error.code !== undefined) setError(firebaseErrorTranslater(error.code));
    else setError('Unexpected Error Occured. Try Again');
    setLoading(false);
  };

  const successHandler = (token: string) => {
    dispatch(loginUser(token));
    setError('');
    setLoading(false);
  };

  const loginHander = () => {
    setLoading(true);
    signInWithEmailAndPassword(Auth, email, password)
      .then((userRecord) => {
        userRecord.user.getIdToken().then(successHandler).catch(errorHandler);
      })
      .catch(errorHandler);
  };

  const isError = error !== '';

  return (
    <React.Fragment>
      <Head>
        <title>Login to Funfuse</title>
      </Head>
      <div className='flex flex-col justify-center w-screen h-screen p-2'>
        <div className='h-[10rem] w-auto'>
          <ThemeLogo />
        </div>
        <ThemeInputBox
          iconClass='funfuse-icons-email'
          placeholder='Enter Email Address'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type={'email'}
        />
        <ThemeInputBox
          iconClass='funfuse-icons-lock'
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type={'password'}
        />
        {isError ? (
          <label className='m-2 mt-4 text-red-400 font-funfuse'>{error}</label>
        ) : null}
        {loading ? (
          <div className='w-16 h-16 mx-auto mt-8 border-b-2 rounded-full border-funfuse animate-spin' />
        ) : (
          <ThemeButton
            buttonText={'Login'}
            twClass='w-3/4 mx-auto text-xl mt-8'
            buttonCallback={loginHander}
          />
        )}
      </div>
    </React.Fragment>
  );
}
