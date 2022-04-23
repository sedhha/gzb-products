import LoginPage from '@/components/funfuse/Login/LoginPage';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import FirebaseClientAuth from '@firebase-client/client.config';
import { useAppDispatch } from '@redux-tools/hooks';
import { updateUserVerification } from '@redux-slices/user';

export default function LoginPageRoute() {
  const [userIdToken, setUserIdToken] = useState<string>('');
  const dispatch = useAppDispatch();
  onAuthStateChanged(FirebaseClientAuth, (user) => {
    if (user) {
      user.getIdToken().then((token) => {
        setUserIdToken(token);
        dispatch(updateUserVerification(user.emailVerified));
      });
    }
  });
  return <LoginPage idToken={userIdToken} />;
}
