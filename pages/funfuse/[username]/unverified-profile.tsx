import { genericRoutes } from '@/components/funfuse/constants/verifiedRoutes';
import UnVerified from '@/components/funfuse/HomeController/UnVerifiedAccount/UnVerified';
import { useRouter } from 'next/router';
import React from 'react';

export default function UnverifiedProfile() {
  const username = useRouter().query?.username ?? 'uv';

  return (
    <UnVerified
      username={username as string}
      pageRoute={genericRoutes.UNVERIFIED}
    />
  );
}
