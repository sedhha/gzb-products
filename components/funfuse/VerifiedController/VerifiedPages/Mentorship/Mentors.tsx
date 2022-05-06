import React from 'react';

import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';
import UserCard from '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/UserCard/UserCard';
import Image from 'next/image';
import ThemeButton from '@/components/funfuse/Buttons/ThemeButton/ThemeButton';
import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

type Props = {
  modifyShowAllSkills: (show: boolean) => void;
  modifyShowAllInterests: (show: boolean) => void;
  onSkipHandler: () => void;
  firebaseToken?: string;
  isLoggedIn: boolean;
  users: IFunfuseFrontendUser[];
  activeIndex: number;
  isLoading: boolean;
  showAllInterests: boolean;
  showAllSkills: boolean;
  onInviteToMeetHandler: () => void;
};
export default function Mentors({
  users,
  onSkipHandler,
  onInviteToMeetHandler,
  modifyShowAllSkills,
  modifyShowAllInterests,
  activeIndex,
  isLoading,
  showAllSkills,
  showAllInterests,
}: Props) {
  const user = users[activeIndex];

  return (
    <div className='flex flex-col items-center justify-around w-full h-full'>
      {users.length > 0 &&
        activeIndex < users.length &&
        (isLoading ? (
          <ResizeSpinner />
        ) : (
          <UserCard
            showAllSkills={showAllSkills}
            showAllInterests={showAllInterests}
            modifyShowAllSkills={modifyShowAllSkills}
            modifyShowAllInterests={modifyShowAllInterests}
            user={user}
            noSetAuto
          />
        ))}
      {activeIndex >= users.length ? (
        <div className='flex flex-col items-center justify-center flex-auto p-4'>
          <Image
            src='/funfuse/no-profiles.svg'
            alt='End of the road'
            layout='fixed'
            height={200}
            width={200}
            priority
          />
          <label className='font-semibold text-center text-funfuse font-md font-funfuse'>
            No Mentors Available at the moment. Check back after some time.
          </label>
        </div>
      ) : (
        <React.Fragment>
          <div className='flex flex-row items-center justify-around flex-1 w-full gap-2 px-2'>
            <ThemeButton
              buttonText={'Invite To Meet'}
              buttonCallback={onInviteToMeetHandler}
              twClass='rounded-md p-0 w-full'
            />
            <ThemeButton
              buttonText={'Next'}
              buttonCallback={onSkipHandler}
              twClass='bg-funfuse_red rounded-md p-0 w-full'
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
