import UnVerified from '@/components/funfuse/HomeController/UnVerifiedAccount/UnVerified';
import { useAppSelector } from '@redux-tools/hooks';
import React from 'react';

export default function UnverifiedProfile() {
  const { user } = useAppSelector((state) => state.user);
  return <UnVerified username={user?.username ?? 'uv'} />;
}
