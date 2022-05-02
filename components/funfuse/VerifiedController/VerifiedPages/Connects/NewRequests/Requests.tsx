import React from 'react';
import RequestsCard from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/ConnectCard/NewConnectCard';
import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import IMessage from '@/components/funfuse/IllustrationMessage/IMessage';
import Link from 'next/link';

type Props = {
  requests: IFunfuseFrontendUser[];
  username?: string;
};

export default function ExistingConnections({ requests, username }: Props) {
  return (
    <div className='flex flex-col items-center gap-2 mt-4 overflow-auto'>
      {requests.map((element) => (
        <RequestsCard
          key={element.uid}
          imageUrl={element.imageLoc}
          bio={element.bio}
          userName={element.name}
        />
      ))}
      {requests.length === 0 && (
        <IMessage
          src={'/funfuse/no-requests.svg'}
          alt={'No Connections'}
          JSXMessageComponent={
            <label className='text-center text-gray-400 font-md font-funfuse'>
              New Friends are on the way! Meanwhile go and{' '}
              <Link
                href={`/funfuse/${username ? username + '/home' : 'login'}`}
                passHref>
                <a className='underline decoration-funfuse text-funfuse underline-offset-2'>
                  discover
                </a>
              </Link>{' '}
              some people and build your FunFuse Community
            </label>
          }
        />
      )}
    </div>
  );
}
