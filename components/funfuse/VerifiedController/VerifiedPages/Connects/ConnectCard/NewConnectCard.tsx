import React from 'react';
type Props = {
  imageUrl?: string;
  senderName: string;
  latestMessage: string;
};

export default function ConnectionBox({
  imageUrl,
  senderName,
  latestMessage,
}: Props) {
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
          className={`flex-1 rounded-full shadow-lg shadow-indigo-500/50 min-h-[5rem] min-w-[5rem] max-h-[5rem] max-w-[5rem]`}
        />
        <div className='flex flex-col flex-auto w-full'>
          <div
            aria-label='Funfuse-Message-Header'
            className='flex flex-row items-center gap-2 mt-1'>
            <h2 className='px-1 text-xl text-black'>
              {senderName ?? 'John Doe'}
            </h2>
          </div>
          <div
            aria-label='Funfuse-Message-Body'
            className='flex items-center justify-between w-full'>
            <label className='text-sm text-gray-400'>{newMsgValue}</label>
          </div>
        </div>
        <div className='flex gap-2 mx-2 mt-auto'>
          <div className='w-6 h-6 border rounded-sm bg-funfuse_green funfuse-icons-check hover:scale-95' />
          <div className='w-6 h-6 border rounded-sm bg-funfuse_red funfuse-icons-cross hover:scale-95' />
        </div>
      </div>
      <div className='w-full px-2 h-[0.02rem] bg-gray-500 my-2' />
    </React.Fragment>
  );
}
