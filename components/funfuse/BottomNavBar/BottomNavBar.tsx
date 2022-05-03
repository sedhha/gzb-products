import { useRouter } from 'next/router';
import React from 'react';
import {
  verifiedRoutes,
  navBarItems,
  genericRoutes,
} from '@/components/funfuse/constants/verifiedRoutes';
import { IBottomNav } from '@constants/interfaces/funfuse/frontend/ui-props/TopNavBar.interfaces';

export default function BottomNavBar({ username, currentRoute }: IBottomNav) {
  const router = useRouter();

  return (
    <div className='flex flex-row items-center justify-between w-full px-2 py-3 border-gray-400 border-solid'>
      {Object.keys(verifiedRoutes).map((element) => {
        const value = verifiedRoutes[element as keyof typeof verifiedRoutes];
        const iconValue = navBarItems[element as keyof typeof navBarItems];
        return (
          <div
            key={element}
            onClick={() => {
              router.push(`/funfuse/${username}/${value}`);
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
