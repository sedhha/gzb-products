import { useAppSelector } from '@redux-tools/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { navBarHeaders } from '@/components/funfuse/constants/verifiedRoutes';
import AppWrapper from '@/components/funfuse/hoc/AppWrapper';
import Head from 'next/head';
import { disconnectFireStoreUser } from '@redux-apis/external/login';
import MessageWindows from '@/components/funfuse/VerifiedController/VerifiedPages/Messages/MessageWindow';

interface IRoute {
  pageRoute: string;
  username: string;
}

export default function VerifiedController({ pageRoute, username }: IRoute) {
  const user = useAppSelector((state) => state.user);
  const isVerifiedUser = user?.isUserVerified ?? false;
  let navBarHeader = navBarHeaders.HOME_ROUTE;
  const router = useRouter();

  const setUserOffline = React.useCallback(() => {
    if (user.isLoggedIn && user.firebaseToken)
      disconnectFireStoreUser(user.firebaseToken);
  }, [user?.isLoggedIn, user?.firebaseToken]);

  useEffect(() => {
    if (window) {
      window.addEventListener('beforeunload', setUserOffline);
    }
    return () => window.removeEventListener('beforeunload', setUserOffline);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (router && !isVerifiedUser) {
      router.push('/funfuse/login');
    }
  }, [isVerifiedUser, router]);

  return (
    <React.Fragment>
      <Head>
        <title>Messages - {username ?? 'Guest'}</title>
      </Head>
      <AppWrapper
        topNavBarprops={{
          headerText: navBarHeader,
          username: username,
        }}
        childComponent={<MessageWindows />}
        bottomNavBarprops={{
          username: username,
          currentRoute: pageRoute,
        }}
      />
    </React.Fragment>
  );
}
