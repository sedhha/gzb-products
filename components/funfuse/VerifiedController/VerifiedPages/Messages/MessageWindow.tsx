import { IFunFuseMessageBox } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { useAppSelector } from '@redux-tools/hooks';
import { useRouter, withRouter, SingletonRouter } from 'next/router';
import React from 'react';

import Conversations from './Conversations';
type IMessageUserProps = {
  router: SingletonRouter;
};

type IMessageUser = {
  name: string;
  imageUrl: string;
};

const dummyConversations: IFunFuseMessageBox[] = [
  {
    fromSelf: false,
    time: 1651578031190,
    textContent: 'Hello',
  },
  {
    fromSelf: true,
    time: 1651578231190,
    textContent: 'Hey! How are you doing!',
  },
  {
    fromSelf: false,
    time: 1651578431190,
    textContent:
      'I have been working in digital marketing agency from last 3 years. I have built some cloud engines previously on AWS.',
  },
  {
    fromSelf: true,
    time: 1651578631190,
    textContent:
      'I have been working in digital marketing agency from last 3 years. I have built some cloud engines previously on AWS.',
  },
  {
    fromSelf: true,
    time: 1651579131190,
    textContent:
      'I have been working in digital marketing agency from last 3 years. I have built some cloud engines previously on AWS.',
  },
  {
    fromSelf: true,
    time: 1651579231190,
    textContent:
      'I have been working in digital marketing agency from last 3 years. I have built some cloud engines previously on AWS.',
  },
  {
    fromSelf: false,
    time: 1651579331190,
    textContent:
      'I have been working in digital marketing agency from last 3 years. I have built some cloud engines previously on AWS.',
  },
  {
    fromSelf: false,
    time: 1651579431190,
    textContent:
      'I have been working in digital marketing agency from last 3 years. I have built some cloud engines previously on AWS.',
  },
];

const MessageWindows = (props: IMessageUserProps) => {
  const router = useRouter();
  // const senderUserName = router.query.messageId as string;
  const { name, imageUrl } = props.router.query as IMessageUser;
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
        conversations={dummyConversations}
        selfUrl={user?.imageLoc ?? '/funfuse/avatar-02.jpg'}
        recieverUrl={imageUrl}
        selfName={user?.name ?? 'John Doe'}
        recieverName={name}
      />
      <div className='flex flex-row items-center justify-around gap-2 mt-2'>
        <div className='flex-auto drop-shadow-xl'>
          <input className='w-full border-2 outline-none border-t-gray-200 font-funfuse' />
        </div>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div className='funfuse-icons-send h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
    </div>
  );
};
export default withRouter(MessageWindows);
