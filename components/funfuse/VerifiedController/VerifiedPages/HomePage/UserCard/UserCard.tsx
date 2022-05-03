import React from 'react';
import ComponentDisplay from '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/ComponentDisplay/ComponentDisplay';
import Image from 'next/image';
import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';
import ImageCard from '@/components/funfuse/ImageCard/ImageCard';
type Props = {
  showAllSkills: boolean;
  modifyShowAllSkills: (show: boolean) => void;
  showAllInterests: boolean;
  modifyShowAllInterests: (show: boolean) => void;
  user: IFunfuseFrontendUser;
};

export default function UserCard({
  showAllSkills,
  modifyShowAllSkills,
  showAllInterests,
  modifyShowAllInterests,
  user,
}: Props) {
  return (
    <div
      aria-label='funfuse-user-card'
      className='relative flex flex-col items-center flex-auto w-full p-2 m-2 my-auto overflow-x-hidden overflow-y-auto'>
      <div className='relative'>
        <ImageCard
          imageUrl={user.imageLoc}
          altString={'Profile-' + user.name}
          imgDimension={'16rem'}
        />
        {user.online ? (
          <div className='h-[1.5rem] w-[1.5rem] bottom-4 left-3/4 bg-green-500 absolute rounded-full' />
        ) : null}
      </div>
      <h2 className='mt-2 text-2xl font-semibold leading-5 text-center font-funfuse'>
        {user.name}
      </h2>
      <label className='mt-1 text-xs text-center text-gray-500 font-funfuse'>
        {user.bio}
      </label>
      <ComponentDisplay
        showFullDisplay={showAllSkills}
        elements={user.skills}
        displayLabel={'Knows'}
        updateDisplay={modifyShowAllSkills}
      />
      <ComponentDisplay
        showFullDisplay={showAllInterests}
        elements={user.interests}
        displayLabel={'Interests'}
        updateDisplay={modifyShowAllInterests}
      />
    </div>
  );
}
