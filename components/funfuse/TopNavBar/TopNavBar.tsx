import React, { useEffect, useState } from 'react';
import FullWidthImage from '@/components/funfuse/FullWidthImage/FullWidthImage';
import { HeaderProps } from '@constants/interfaces/funfuse/frontend/ui-props/TopNavBar.interfaces';
import { useAppDispatch, useAppSelector } from '@redux-tools/hooks';
import { useRouter } from 'next/router';
import { genericRoutes } from '@/components/funfuse/constants/verifiedRoutes';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';
import { updateDp } from '@redux-slices/user';
export default function TopNavBar({
  headerText,
  imageRef,
  username,
}: HeaderProps) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [displayImage, setDisplayImage] = useState(
    imageRef ?? '/funfuse/avatar.png'
  );
  useEffect(() => {
    console.log(user);
    if (user?.imageLoc) {
      const storageRef = ref(storage, user.imageLoc);
      getDownloadURL(storageRef).then((url) => {
        dispatch(updateDp(url));
        setDisplayImage(url);
      });
    }
  }, [user, dispatch]);
  return (
    <div className='flex flex-row items-center justify-between w-full px-2 py-3 bg-funfuse'>
      <h2 className='p-0 m-0 text-2xl text-white font-funfuse '>
        {headerText}
      </h2>
      <div
        className='relative w-12 h-12'
        onClick={() => {
          router.push(`/funfuse/${username}/${genericRoutes.PROFILE_ROUTE}`);
        }}>
        <FullWidthImage
          src={displayImage}
          alt={username ?? 'User Avatar'}
          containerDivClass='border border-gray-100 rounded-full shadow-sm overflow-hidden'
        />
        {/* {<div className='absolute top-0 right-0 w-3 h-3 my-1 bg-green-400 border-2 border-white rounded-full z-2'></div>} */}
      </div>
    </div>
  );
}

/*
Auth.signOut();
          dispatch(logOut());
          router.push('/funfuse/login');
*/
