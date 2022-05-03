import React from 'react';
import TopNavBar from '@/components/funfuse/TopNavBar/TopNavBar';
import BottomNavBar from '@/components/funfuse/BottomNavBar/BottomNavBar';
import {
  HeaderProps,
  IBottomNav,
} from '@constants/interfaces/funfuse/frontend/ui-props/TopNavBar.interfaces';

type Props = {
  childComponent?: JSX.Element;
  topNavBarprops?: HeaderProps;
  bottomNavBarprops: IBottomNav;
};

export default function AppWrapper({
  childComponent,
  topNavBarprops,
  bottomNavBarprops,
}: Props) {
  return (
    <div className='flex flex-col justify-around w-screen h-screen align-center'>
      {topNavBarprops ? (
        <TopNavBar {...topNavBarprops} />
      ) : (
        <TopNavBar headerText={'Unverified Account'} />
      )}
      <div className='flex flex-col flex-auto max-h-screen overflow-auto'>
        {childComponent}
      </div>

      <BottomNavBar {...bottomNavBarprops} />
    </div>
  );
}
