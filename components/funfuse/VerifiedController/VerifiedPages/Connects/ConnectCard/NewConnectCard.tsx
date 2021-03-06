import {
  genericRoutes,
  verifiedRoutes,
} from '@/components/funfuse/constants/verifiedRoutes';
import ImageCard from '@/components/funfuse/ImageCard/ImageCard';
import { useAppSelector } from '@redux-tools/hooks';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  imageUrl?: string;
  userName: string;
  bio: string;
  uid: string;
  addFriend: (senderUid: string) => void;
  rejectFriend: (senderUid: string) => void;
};

export default function ConnectionBox({
  imageUrl,
  userName,
  bio,
  uid,
  addFriend,
  rejectFriend,
}: Props) {
  const newMsgValue = bio.length > 60 ? `${bio.slice(0, 60)}...` : bio;
  const router = useRouter();
  const username = router.query.username ?? 'unknown';
  return (
    <React.Fragment>
      <div className='flex w-full gap-2' aria-label='Funfuse-Message-Container'>
        <ImageCard
          imageUrl={imageUrl}
          onClick={() => {
            const pathName = `/funfuse/${username}/${genericRoutes.VIEW_ROUTE}/${uid}`;
            router.push(pathName);
          }}
        />
        <div className='flex flex-col flex-auto w-full'>
          <div
            aria-label='Funfuse-Message-Header'
            className='flex flex-row items-center gap-2 mt-1'>
            <h2 className='px-1 text-xl text-black'>
              {userName ?? 'John Doe'}
            </h2>
          </div>
          <div
            aria-label='Funfuse-Message-Body'
            className='flex items-center justify-between w-full'>
            <label className='text-sm text-gray-400'>{newMsgValue}</label>
          </div>
        </div>
        <div className='flex gap-2 mx-2 mt-auto'>
          <div
            className='w-6 h-6 border rounded-sm bg-funfuse_green funfuse-icons-check hover:scale-95'
            onClick={() => addFriend(uid)}
          />
          <div
            className='w-6 h-6 border rounded-sm bg-funfuse_red funfuse-icons-cross hover:scale-95'
            onClick={() => rejectFriend(uid)}
          />
        </div>
      </div>
      <div className='w-full px-2 h-[0.02rem] bg-gray-500 my-2' />
    </React.Fragment>
  );
}
