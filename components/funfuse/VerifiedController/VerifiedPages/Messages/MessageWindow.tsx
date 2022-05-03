import { IFunFuseMessageBox } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { useAppSelector } from '@redux-tools/hooks';
import { useRouter, withRouter, SingletonRouter } from 'next/router';
import React, { useEffect } from 'react';

import Conversations from './Conversations';
type IMessageUserProps = {
  router: SingletonRouter;
};

type IMessageUser = {
  name: string;
  imageUrl: string;
  uid: string;
};

const MessageWindows = (props: IMessageUserProps) => {
  const router = useRouter();
  // const senderUserName = router.query.messageId as string;
  const { name, imageUrl, uid } = props.router.query as IMessageUser;
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className='flex flex-col w-full h-full p-2 overflow-auto'>
      <div className='flex items-center justify-around'>
        <label className='flex-auto text-lg text-center text-bold font-funfuse'>
          {name ?? 'John Doe'}
        </label>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div className='funfuse-icons-back h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
      <Conversations
        selfUrl={user?.imageLoc ?? '/funfuse/avatar-02.jpg'}
        recieverUrl={imageUrl}
        selfName={user?.name ?? 'John Doe'}
        recieverName={name}
        senderUid={user?.uid ?? ''}
        recieverUid={uid}
      />
    </div>
  );
};
export default withRouter(MessageWindows);
