import { useAppSelector } from '@redux-tools/hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { verifiedRoutes } from '@/components/funfuse/constants/verifiedRoutes';
import VerifiedComponents from '@/components/funfuse/VerifiedController/VerifiedPages';

export default function VerifiedController() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const pageRoute = router.query?.urlSlug?.[1] ?? verifiedRoutes.HOME_ROUTE;
  const isVerifiedUser = user?.isUserVerified ?? false;
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
      break;
    }
    case verifiedRoutes.CONNECTS_ROUTE: {
      const ConnectsPage = VerifiedComponents.Connects;
      RenderComponent = <ConnectsPage />;
      break;
    }
    case verifiedRoutes.MENTORSHIP_ROUTE: {
      const MentorshipPage = VerifiedComponents.Mentorship;
      RenderComponent = <MentorshipPage />;
      break;
    }
    case verifiedRoutes.MESSAGES_ROUTE: {
      const MessagesPage = VerifiedComponents.Messages;
      RenderComponent = <MessagesPage />;
      break;
    }
    case verifiedRoutes.EVENTS_ROUTE: {
      const EventsPage = VerifiedComponents.Events;
      RenderComponent = <EventsPage />;
      break;
    }
    default: {
      const UnknownPage = VerifiedComponents.Unknown;
      RenderComponent = <UnknownPage />;
      break;
    }
  }
  return RenderComponent;
}
