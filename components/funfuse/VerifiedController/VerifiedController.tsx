import { useAppSelector } from '@redux-tools/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  navBarHeaders,
  verifiedRoutes,
} from '@/components/funfuse/constants/verifiedRoutes';
import VerifiedComponents from '@/components/funfuse/VerifiedController/VerifiedPages';
import AppWrapper from '@/components/funfuse/hoc/AppWrapper';
import Head from 'next/head';

export default function VerifiedController() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const pageRoute = router.query?.urlSlug?.[1] ?? verifiedRoutes.HOME_ROUTE;
  const isVerifiedUser = user?.isUserVerified ?? false;
  let navBarHeader = navBarHeaders.HOME_ROUTE;
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
        <title>Funfuse: {user?.user?.username ?? 'Guest'}</title>
      </Head>
      <AppWrapper
        topNavBarprops={{ headerText: navBarHeader }}
        childComponent={RenderComponent}
      />
    </React.Fragment>
  );
}
