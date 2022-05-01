import React from 'react';
import Image from 'next/image';
type Props = {
  imageUrl?: string;
  senderName: string;
  newMessageCount?: number;
  latestMessage: string;
};

export default function MessageBox({
  imageUrl,
  senderName,
  newMessageCount,
  latestMessage,
}: Props) {
  const isNewMessageDefined = newMessageCount ? true : false;
  const shadowColor = isNewMessageDefined ? 'shadow-indigo-500/50' : '';
  const newMsgValue =
    latestMessage.length > 60
      ? `${latestMessage.slice(0, 60)}...`
      : latestMessage;
  return (
    <React.Fragment>
      <div className='flex w-full gap-2' aria-label='Funfuse-Message-Container'>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img
          alt='Message Image'
          src={imageUrl ?? '/funfuse/avatar-02.jpg'}
          className={`flex-1 rounded-full shadow-lg ${shadowColor} min-h-[5rem] min-w-[5rem] max-h-[5rem] max-w-[5rem]`}
        />
        <div className='flex flex-col'>
          <div
            aria-label='Funfuse-Message-Header'
            className='flex flex-row items-center gap-2 mt-1'>
            <h2 className='text-xl text-black'>{senderName ?? 'John Doe'}</h2>
            {isNewMessageDefined && (
              <div className='h-[1.2rem] w-[1.2rem] rounded-full relative bg-funfuse'>
                <label className='absolute text-xs text-white transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                  {newMessageCount}
                </label>
              </div>
            )}
          </div>
          <div aria-label='Funfuse-Message-Body'>
            <label className='text-sm font-semibold text-gray-400'>
              {newMsgValue}
            </label>
          </div>
        </div>
      </div>
      <div className='w-full px-2 h-[0.02rem] bg-gray-500 my-2' />
    </React.Fragment>
  );
}
