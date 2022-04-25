import React, { useCallback, useEffect, useState } from 'react';
import Auth from '@firebase-client/client.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginUser } from '@redux-slices/user';
import { useAppDispatch, useAppSelector } from '@redux-tools/hooks';
import Head from 'next/head';
import ThemeLogo from '@/components/funfuse/Logos/ThemeLogo';
import ThemeInputBox from '@/components/common/Inputs/ThemeInputBox';
import { FirebaseError } from 'firebase/app';
import ThemeButton from '../Buttons/ThemeButton/ThemeButton';
import { firebaseErrorTranslater } from '@firebase-server/public/errorTranslator';
import { useRouter } from 'next/router';
import {
  genericRoutes,
  verifiedRoutes,
} from '@/components/funfuse/constants/verifiedRoutes';
import Link from 'next/link';
import useAbortableState from '@hooks/useAbortableState';

type Props = {
  idToken: string;
};
export default function LoginPage({ idToken }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isUserVerified } = useAppSelector((state) => state.user);

  const errorHandler = (error: FirebaseError) => {
    console.log('Error while logging in = ', error);
    if (error.code !== undefined && mounted)
      setError(firebaseErrorTranslater(error.code));
    else mounted && setError('Unexpected Error Occured. Try Again');
    if (mounted) setLoading(false);
  };

  const successHandler = useCallback(
    (token: string) => {
      dispatch(loginUser(token));
      mounted && setError('');
      mounted && setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, setError, setLoading]
  );

  useEffect(() => {
    if (idToken !== '') {
      setLoading(true);
      successHandler(idToken);
    }
  }, [idToken, successHandler, setLoading]);

  useEffect(() => {
    if (user?.username) {
      if (isUserVerified)
        router.push(`/funfuse/${user.username}/${verifiedRoutes.HOME_ROUTE}`);
      else router.push(`/funfuse/${genericRoutes.UNVERIFIED}`);
    }
  }, [user?.username, router, isUserVerified]);

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
        <label className='m-2 mt-4 text-gray-400 font-funfuse'>
          Don&apos;t have an Account ?{' '}
          <Link href='/funfuse/register' passHref>
            <a className='underline cursor-pointer text-funfuse'>
              Register Here.
            </a>
          </Link>
        </label>
      </div>
    </React.Fragment>
  );
}
