import React, { useEffect, useState } from 'react';
import VerifiedMessageController from '@/components/funfuse/VerifiedController/MessagesController';
import AuthWrapper from '@/components/funfuse/hoc/AuthWrapper';
import { onAuthStateChanged } from 'firebase/auth';
import { verifiedRoutes } from '@/components/funfuse/constants/verifiedRoutes';
import { updateUserVerification } from '@redux-slices/user';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@redux-tools/hooks';
import FirebaseClientAuth from '@firebase-client/client.config';

type Props = {};

export default function MessageBox({}: Props) {
  const [userIdToken, setUserIdToken] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(true);
  const username = useRouter().query?.username ?? 'Guest';
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
      childComponent={
        <VerifiedMessageController
          pageRoute={verifiedRoutes.MESSAGES_ROUTE}
          username={username as string}
        />
      }
    />
  );
}
