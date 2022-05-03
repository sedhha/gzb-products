import LoginPage from '@/components/funfuse/Login/LoginPage';
import React, { useState, useEffect } from 'react';
import FirebaseClientAuth from '@firebase-client/client.config';
import { useAppDispatch } from '@redux-tools/hooks';
import { updateUserVerification } from '@redux-slices/user';
import Head from 'next/head';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';

export default function LoginPageRoute() {
  const [userIdToken, setUserIdToken] = useState<string>('');
  const [stateLoading, setStateLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    FirebaseClientAuth.onAuthStateChanged((user) => {
      if (user) {
        setStateLoading(true);
        user.getIdToken(true).then((token) => {
          setUserIdToken(token);
          dispatch(updateUserVerification(user.emailVerified));
          setStateLoading(false);
        });
      }
    });
  }, [dispatch]);
  return (
    <React.Fragment>
      <Head>
        <title>Login to Funfuse</title>
      </Head>
      {stateLoading ? (
        <ResizeSpinner fullScreen />
      ) : (
        <LoginPage idToken={userIdToken} />
      )}
    </React.Fragment>
  );
}
