import { useAppSelector } from '@redux-tools/hooks';
import { withRouter, SingletonRouter, useRouter } from 'next/router';
import React from 'react';

import Conversations from './Conversations';
type IMessageUserProps = {
  router: SingletonRouter;
};

export type IMessageUserUrlParams = {
  name: string;
  imageUrl: string;
  uid: string;
  recipientUserName: string;
};

const MessageWindows = (props: IMessageUserProps) => {
  // const senderUserName = router.query.messageId as string;
  const { name, imageUrl, uid, recipientUserName } = props.router
    .query as IMessageUserUrlParams;
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  return (
    <div className='flex flex-col w-full h-full p-2 overflow-auto'>
      <div className='flex items-center justify-around'>
        <label className='flex-auto text-lg text-center text-bold font-funfuse'>
          {name ?? 'John Doe'}
        </label>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div
            className='funfuse-icons-back h-[1rem] w-[1rem] bg-white'
            onClick={() => router.back()}
          />
        </div>
      </div>
      <Conversations
        selfUrl={user?.imageLoc ?? '/funfuse/avatar-02.jpg'}
        recieverUrl={imageUrl}
        selfName={user?.name ?? 'John Doe'}
        recieverName={name}
        senderUid={user?.uid ?? ''}
        recieverUid={uid}
        recipientUserName={recipientUserName}
      />
    </div>
  );
};
export default withRouter(MessageWindows);
