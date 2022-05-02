import React, { useState, useEffect } from 'react';
import ComponentDisplay from '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/ComponentDisplay/ComponentDisplay';
import Image from 'next/image';
import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';
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
  const [iUri, setIUri] = useState('/funfuse/avatar-02.jpg');
  const [imageReady, setImageReady] = useState(false);
  useEffect(() => {
    if (user.imageLoc.startsWith('/')) {
      setIUri(user.imageLoc);
      setImageReady(true);
    } else {
      const storageRef = ref(storage, user.imageLoc);
      getDownloadURL(storageRef).then((url) => {
        setIUri(url);
        setImageReady(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.imageLoc]);
  return (
    <div
      aria-label='funfuse-user-card'
      className='relative flex flex-col items-center flex-auto p-2 m-2 my-auto overflow-x-hidden overflow-y-auto border-2 border-indigo-300 rounded-md'>
      <div className='relative'>
        {imageReady ? (
          <Image
            src={iUri}
            alt={'Profile - ' + user.name}
            width={200}
            height={200}
            layout='intrinsic'
            className='rounded-full'
            objectFit='cover'
            objectPosition={'center'}
            priority
          />
        ) : (
          <ResizeSpinner />
        )}
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
