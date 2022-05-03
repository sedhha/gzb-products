import { useAppSelector } from '@redux-tools/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  genericRoutes,
  navBarHeaders,
  verifiedRoutes,
} from '@/components/funfuse/constants/verifiedRoutes';
import VerifiedComponents from '@/components/funfuse/VerifiedController/VerifiedPages';
import AppWrapper from '@/components/funfuse/hoc/AppWrapper';
import Head from 'next/head';
import { disconnectFireStoreUser } from '@redux-apis/external/login';

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
  let RenderComponent = <div>Verified Route</div>;
  switch (pageRoute) {
    case verifiedRoutes.HOME_ROUTE: {
      const HomePage = VerifiedComponents.Home;
      RenderComponent = <HomePage />;
      navBarHeader = navBarHeaders.HOME_ROUTE;
      break;
    }
    case verifiedRoutes.CONNECTS_ROUTE: {
      const ConnectsPage = VerifiedComponents.Connects;
      RenderComponent = <ConnectsPage />;
      navBarHeader = navBarHeaders.CONNECTS_ROUTE;
      break;
    }
    case verifiedRoutes.MENTORSHIP_ROUTE: {
      const MentorshipPage = VerifiedComponents.Mentorship;
      RenderComponent = <MentorshipPage />;
      navBarHeader = navBarHeaders.MENTORSHIP_ROUTE;
      break;
    }
    case verifiedRoutes.MESSAGES_ROUTE: {
      const MessagesPage = VerifiedComponents.Messages;
      RenderComponent = <MessagesPage />;
      navBarHeader = navBarHeaders.MESSAGES_ROUTE;
      break;
    }
    case verifiedRoutes.EVENTS_ROUTE: {
      const EventsPage = VerifiedComponents.Events;
      RenderComponent = <EventsPage />;
      navBarHeader = navBarHeaders.EVENTS_ROUTE;
      break;
    }
    case genericRoutes.PROFILE_ROUTE: {
      const ProfilePage = VerifiedComponents.Profile;
      RenderComponent = <ProfilePage />;
      navBarHeader = navBarHeaders.PROFILE_ROUTE;
      break;
    }
    default: {
      const UnknownPage = VerifiedComponents.Unknown;
      RenderComponent = <UnknownPage />;
      navBarHeader = navBarHeaders.UNKNOWN_ROUTE;
      break;
    }
  }
  return (
    <React.Fragment>
      <Head>
        <title>Funfuse: {username ?? 'Guest'}</title>
      </Head>
      <AppWrapper
        topNavBarprops={{
          headerText: navBarHeader,
          username: username,
        }}
        childComponent={RenderComponent}
        bottomNavBarprops={{
          username: username,
          currentRoute: pageRoute,
        }}
      />
    </React.Fragment>
  );
}
