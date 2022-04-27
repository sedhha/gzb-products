import React from 'react';

type Props = {
  ModalBody: JSX.Element;
  closeModal: () => void;
};

export default function NotificationModal({ ModalBody, closeModal }: Props) {
  return (
    <div className='absolute top-0 left-0 w-full h-full'>
      <div
        aria-label='background-overlay'
        className='absolute top-0 w-full h-full bg-black opacity-60'
      />
      <div className='absolute flex flex-col items-center justify-center w-full h-full p-2'>
        <div className='flex flex-row items-center justify-between w-full p-2 bg-funfuse'>
          <h1 className='text-white font-funfuse text-md'>
            Update Preferences
          </h1>
          <label className='font-mono text-xl text-white' onClick={closeModal}>
            X
          </label>
        </div>
        {ModalBody}
      </div>
    </div>
  );
}
