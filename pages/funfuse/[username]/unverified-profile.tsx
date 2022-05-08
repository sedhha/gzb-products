import { genericRoutes } from '@/components/funfuse/constants/verifiedRoutes';
import UnVerified from '@/components/funfuse/HomeController/UnVerifiedAccount/UnVerified';
import { useRouter } from 'next/router';
import React from 'react';
import Auth from '@firebase-client/client.config';

export default function UnverifiedProfile() {
  const username = useRouter().query?.username ?? 'uv';
  const router = useRouter();
  React.useEffect(() => {
    if (Auth.currentUser === null) {
      router.push('/funfuse/login');
    }
  }, [router]);
  return (
    <UnVerified
      username={username as string}
      pageRoute={genericRoutes.UNVERIFIED}
    />
  );
}
