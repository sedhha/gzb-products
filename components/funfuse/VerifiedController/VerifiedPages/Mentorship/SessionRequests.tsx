import IMessage from '@/components/funfuse/IllustrationMessage/IMessage';
import { IFunFuseMentorRDBConfig } from '@constants/interfaces/funfuse/backend/Dyte.interfaces';
import { IMentorRequests } from '@immediate-states/funfuse/mentorship.state';
import React from 'react';
import RequestCard from './RequestCard';

type Props = {
  requests: IMentorRequests;
  requestsCount: number;
  onCallAcceptHandler: (payload: IFunFuseMentorRDBConfig) => void;
};

export default function SessionRequests({
  requests,
  requestsCount,
  onCallAcceptHandler,
}: Props) {
  return (
    <React.Fragment>
      <div className='mt-5' />
      {Object.keys(requests).map((key) => {
        const element = requests[key];
        return (
          <RequestCard
            key={key}
            imageUrl={element.creatorUrl ?? '/funfuse/avatar-02.jpg'}
            name={element.creatorName ?? 'Guest'}
            onCallAcceptHandler={() => onCallAcceptHandler(element)}
          />
        );
      })}
      {requestsCount === 0 && (
        <IMessage
          src={'/funfuse/no-mentorship-invites.svg'}
          alt={'No Connections'}
          JSXMessageComponent={
            <label className='text-center text-gray-400 font-md font-funfuse'>
              Great! You don&apos;t have any pending invites!
            </label>
          }
        />
      )}
    </React.Fragment>
  );
}
