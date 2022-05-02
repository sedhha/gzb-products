import React from 'react';
import ConnectCard from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/ConnectCard/ExistingConnectionBox';

import IMessage from '@/components/funfuse/IllustrationMessage/IMessage';
import Link from 'next/link';
import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

type Props = {
  connections: IFunfuseFrontendUser[];
  username?: string;
};

export default function ExistingConnections({ connections, username }: Props) {
  return (
    <div className='flex flex-col items-center gap-2 mt-4 overflow-auto'>
      {connections.map((element) => (
        <ConnectCard
          key={element.uid}
          imageUrl={element.imageLoc}
          userName={element.name}
          bio={element.bio}
        />
      ))}
      {connections.length === 0 && (
        <IMessage
          src={'/funfuse/no-connections.svg'}
          alt={'No Connections'}
          JSXMessageComponent={
            <label className='text-center text-gray-400 font-md font-funfuse'>
              It&apos;s so quiet here. Go and{' '}
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
