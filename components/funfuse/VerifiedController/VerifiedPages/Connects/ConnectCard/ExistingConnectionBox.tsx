import {
  genericRoutes,
  verifiedRoutes,
} from '@/components/funfuse/constants/verifiedRoutes';
import ImageCard from '@/components/funfuse/ImageCard/ImageCard';
import { useRouter } from 'next/router';
import React from 'react';
import { IMessageUserUrlParams } from '@/components/funfuse/VerifiedController/VerifiedPages/Messages/MessageWindow';

type Props = {
  imageUrl?: string;
  name: string;
  bio: string;
  recipientUserName: string;
  userName: string;
  uid: string;
};

export default function ConnectionBox({
  imageUrl,
  name,
  bio,
  recipientUserName,
  userName,
  uid,
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
            <h2 className='px-1 text-xl text-black'>{name ?? 'John Doe'}</h2>
          </div>
          <div
            aria-label='Funfuse-Message-Body'
            className='flex items-center justify-between w-full'>
            <label className='text-sm text-gray-400'>{newMsgValue}</label>
            <div className='p-1 rounded-sm bg-funfuse'>
              <div
                className='w-4 h-4 bg-white funfuse-icons-send hover:scale-95'
                onClick={() => {
                  const pathName = `/funfuse/${userName}/${verifiedRoutes.MESSAGES_ROUTE}/${userName}-${recipientUserName}`;
                  router.push(
                    {
                      pathname: pathName,
                      query: {
                        name,
                        imageUrl,
                        uid,
                        recipientUserName,
                      } as IMessageUserUrlParams,
                    },
                    pathName
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full px-2 h-[0.02rem] bg-gray-500 my-2' />
    </React.Fragment>
  );
}
