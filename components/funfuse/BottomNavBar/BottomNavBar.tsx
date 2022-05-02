import { useRouter } from 'next/router';
import React from 'react';
import {
  verifiedRoutes,
  navBarItems,
  genericRoutes,
} from '@/components/funfuse/constants/verifiedRoutes';

export default function BottomNavBar() {
  const router = useRouter();
  const username = router.query?.urlSlug?.[0] ?? 'uv';
  const currentRoute =
    router.query?.urlSlug?.[1] ?? genericRoutes.PROFILE_ROUTE;
  return (
    <div className='flex flex-row items-center justify-between w-full px-2 py-3 border-gray-400 border-solid'>
      {Object.keys(verifiedRoutes).map((element) => {
        const value = verifiedRoutes[element as keyof typeof verifiedRoutes];
        const iconValue = navBarItems[element as keyof typeof navBarItems];
        return (
          <div
            key={element}
            onClick={() => {
              router.push(`${username}/${value}`);
            }}
            className={`${iconValue} h-[3rem] w-[3rem] ${
              value === currentRoute ? 'bg-funfuse' : 'bg-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
}
