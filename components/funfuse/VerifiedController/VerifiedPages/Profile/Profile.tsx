import MultiSelect from '@/components/common/Inputs/MultiSelect/MultiSelect';
import ThemeInputTextArea from '@/components/common/Inputs/ThemeInputTextArea';
import FullWidthImage from '@/components/funfuse/FullWidthImage/FullWidthImage';
import { useAppSelector } from '@redux-tools/hooks';
import React, { useState } from 'react';
export default function Profile() {
  const { user } = useAppSelector((state) => state.user);
  const [bio, setBio] = useState(user?.bio ?? '');
  return (
    <div className='flex flex-col items-center justify-around p-2 overflow-auto'>
      <div className='relative h-[10rem] w-[10rem]'>
        <FullWidthImage
          src={'/funfuse/avatar.png'}
          alt={'User Avatar'}
          containerDivClass='rounded-full overflow-hidden'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black rounded-full shadow-lg cursor-pointer gap-x-2 shadow-indigo-500/50 opacity-60'>
          <div
            className={
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 funfuse-icons-edit h-[2rem] w-[2rem] bg-white hover:scale-90'
            }
          />
        </div>
      </div>
      <label className='w-full p-0 text-xl'>Bio</label>
      <ThemeInputTextArea
        placeholder='Tell the Community about yourself!'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        row={3}
        className={'w-full mt-1 p-4'}
      />
      <label className='w-full p-0 mt-2 text-xl'>Skills</label>
      <MultiSelect />
    </div>
  );
}
