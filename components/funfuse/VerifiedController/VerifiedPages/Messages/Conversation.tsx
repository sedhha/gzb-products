import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';
import { IFunFuseMessageBox } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import React from 'react';

type Props = IFunFuseMessageBox & {
  name: string;
  uri: string;
  loading: boolean;
  fromSelf: boolean;
};
export default function Conversation({
  name,
  uri,
  loading,
  fromSelf,
  textContent,
  time,
}: Props) {
  return (
    <div className='flex items-center justify-around w-full gap-2'>
      {loading ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={name ?? 'Message Image'}
          src={uri ?? '/funfuse/avatar.png'}
          className={
            'w-12 h-12 rounded-full shadow-lg shadow-funfuse' +
            (fromSelf ? ' order-last' : '')
          }
        />
      ) : (
        <div className='overflow-hidden max-w-24 max-h-24'>
          <ResizeSpinner spinnerSize='0.6rem' />
        </div>
      )}
      <div className='flex-auto'>
        <div className='flex flex-col gap-1 p-2 bg-gray-200 rounded-lg'>
          <label className='text-gray-800'>{textContent}</label>
          <label className='w-full text-sm font-semibold text-right'>
            {formatDate(time)}
          </label>
        </div>
      </div>
    </div>
  );
}

const formatDate = (timestamp: number): string =>
  new Date(timestamp).toLocaleTimeString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
