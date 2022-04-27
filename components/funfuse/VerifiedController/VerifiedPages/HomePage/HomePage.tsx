import Image from 'next/image';
import React, { useState } from 'react';
import ComponentDisplay from '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/ComponentDisplay/ComponentDisplay';
import ThemeButton from '@/components/funfuse/Buttons/ThemeButton/ThemeButton';
import NotificationModal from '@/components/funfuse/NotificationModal/NotificationModal';
import dynamic from 'next/dynamic';
import SwapIcon from './SwapIcon/SwapIcon';
const skills = [
  'Supply Chain',
  'Finance',
  'Sales',
  'Marketing',
  'Digital Sales',
  'Blogging',
  'Content',
];
const interests = [
  'Finance',
  'Sales',
  'Marketing',
  'Supply Chain',
  'Blockchain',
  'Web 3.0',
];

const PreferencesComponent = dynamic(
  () =>
    import(
      '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/PreferencesDisplay/PreferencesDisplay'
    )
);

export default function HomePage() {
  const [showAllSKills, setShowAllSkills] = useState(false);
  const [showAllInterests, setShowAllInterests] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const modifyShowAllSkills = (show: boolean) => setShowAllSkills(show);
  const modifyShowAllInterests = (show: boolean) => setShowAllInterests(show);

  return (
    <div className='flex flex-col items-center justify-around w-full h-full gap-1'>
      <div className='relative flex flex-col items-center flex-auto p-2 m-2 my-auto overflow-x-hidden overflow-y-auto border-2 border-indigo-300 rounded-md'>
        <div className='relative'>
          <Image
            src='/funfuse/avatar-02.jpg'
            alt='User Image'
            width={200}
            height={200}
            layout='intrinsic'
            className='rounded-full'
            objectFit='cover'
            objectPosition={'center'}
          />
          <div className='h-[1.5rem] w-[1.5rem] bottom-4 left-3/4 bg-green-500 absolute rounded-full' />
        </div>
        <h2 className='mt-2 text-2xl font-semibold leading-5 text-center font-funfuse'>
          John Doe
        </h2>
        <label className='mt-1 text-xs text-center text-gray-500 font-funfuse'>
          Owner and Supply Chain Head at Tailwind Cookies. Looking for App
          Developers and Digital Marketers to scale our Business.
        </label>
        <ComponentDisplay
          showFullDisplay={showAllSKills}
          elements={skills}
          displayLabel={'Knows'}
          updateDisplay={modifyShowAllSkills}
        />
        <ComponentDisplay
          showFullDisplay={showAllInterests}
          elements={interests}
          displayLabel={'Interests'}
          updateDisplay={modifyShowAllInterests}
        />
      </div>
      <label
        onClick={() => setShowModal(true)}
        className='flex-0.5 mb-1 text-sm text-center text-indigo-500 underline underline-offset-1 font-funfuse'>
        Update Preferences
      </label>
      <div className='flex flex-row items-center justify-around flex-1 w-full gap-2 px-2'>
        <ThemeButton
          buttonText={'Skip'}
          buttonCallback={() => null}
          twClass='bg-funfuse_red rounded-md flex-1 p-0'
        />

        <div className='h-[4rem] w-[4rem]'>
          <SwapIcon />
        </div>
        <ThemeButton
          buttonText={'Connect'}
          buttonCallback={() => null}
          twClass='rounded-md flex-1 p-0'
        />
      </div>
      {showModal ? (
        <NotificationModal
          ModalBody={<PreferencesComponent closeModal={closeModal} />}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
}
