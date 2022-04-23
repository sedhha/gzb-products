import VerifiedController from '@/components/funfuse/VerifiedController/VerifiedController';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import FirebaseClientAuth from '@firebase-client/client.config';
import { useAppDispatch } from '@redux-tools/hooks';
import { updateUserVerification } from '@redux-slices/user';
import AuthWrapper from '@/components/funfuse/hoc/AuthWrapper';
export default function UserName() {
  const [userIdToken, setUserIdToken] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(true);
  useEffect(() => {
    return () => setMounted(false);
  }, []);
  const dispatch = useAppDispatch();
  onAuthStateChanged(FirebaseClientAuth, (user) => {
    if (user) {
      user.getIdToken().then((token) => {
        mounted && setUserIdToken(token);
        dispatch(updateUserVerification(user.emailVerified));
      });
    }
  });
  return (
    <AuthWrapper
      idToken={userIdToken}
      childComponent={<VerifiedController />}
    />
  );
}
