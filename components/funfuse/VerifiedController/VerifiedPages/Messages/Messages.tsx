import React from 'react';
import MessageBox from './MessageBox';

const messages = [
  {
    senderName: 'John Doe',
    imageUrl: '/funfuse/avatar-02.jpg',
    newMessageCount: 0,
    latestMessage: 'Hello, how are you?',
  },
  {
    senderName: 'John Doe',
    imageUrl: '/funfuse/avatar-02.jpg',
    newMessageCount: 4,
    latestMessage:
      'Hello, how are you doing? I was wondering if you could help me with a problem I had.',
  },
  {
    senderName: 'John Doe',
    imageUrl: '/funfuse/avatar-02.jpg',
    newMessageCount: 0,
    latestMessage: 'Hello, how are you?',
  },
  {
    senderName: 'John Doe',
    imageUrl: '/funfuse/avatar-02.jpg',
    newMessageCount: 4,
    latestMessage:
      'Hello, how are you doing? I was wondering if you could help me with a problem I had.',
  },
];

export default function HomePage() {
  return (
    <div className='block h-full min-w-0 p-2 m-2'>
      <div className='flex flex-row items-center justify-around gap-2 overflow-hidden'>
        <div className='flex-auto drop-shadow-xl'>
          <input className='w-full p-0.5 border-t-gray-200 border-2 outline-none font-funfuse' />
        </div>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div className='funfuse-icons-search h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
      <div className='flex flex-col items-center gap-2 mt-4'>
        {messages.map((message, index) => (
          <MessageBox key={index} {...message} />
        ))}
      </div>
    </div>
  );
}
