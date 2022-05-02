import React from 'react';
import ConnectionBox from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/ExistingConnections/ExistingConnectionBox';

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

export default function ExistingConnections() {
  return (
    <div className='flex flex-col items-center gap-2 mt-4 overflow-auto'>
      {messages.map((message, index) => (
        <ConnectionBox key={index} {...message} />
      ))}
    </div>
  );
}
