import React, { useEffect, useReducer } from 'react';
import ThemeButton from '@/components/funfuse/Buttons/ThemeButton/ThemeButton';
import NotificationModal from '@/components/funfuse/NotificationModal/NotificationModal';
import dynamic from 'next/dynamic';
import SwapIcon from './SwapIcon/SwapIcon';
import {
  initState,
  reducer,
  ACTIONTYPES,
} from '@immediate-states/funfuse/homepage.state';
import { useAppSelector } from '@redux-tools/hooks';
import { discoverFirebaseUsers } from '@redux-apis/external/firestoreProfile';
import UserCard from '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/UserCard/UserCard';

const PreferencesComponent = dynamic(
  () =>
    import(
      '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/PreferencesDisplay/PreferencesDisplay'
    )
);

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initState);
  const modifyShowAllSkills = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_SKILLS_MODIFY, payload: show });
  const modifyShowAllInterests = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_INTERESTS_MODIFY, payload: show });
  const setShowModal = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.MODAL_MODIFY, payload: show });
  const closeModal = () => setShowModal(false);

  const { firebaseToken, isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn && firebaseToken) {
      discoverFirebaseUsers(firebaseToken, 0, 20).then((data) => {
        console.log('Data = ', data);
        dispatch({ type: ACTIONTYPES.SET_USERS, payload: data });
      });
    }
  }, [firebaseToken, isLoggedIn]);

  return (
    <div className='flex flex-col items-center justify-around w-full h-full gap-1'>
      {state.users.length > 0 && (
        <UserCard
          showAllSkills={state.showAllSkills}
          showAllInterests={state.showAllInterests}
          modifyShowAllSkills={modifyShowAllSkills}
          modifyShowAllInterests={modifyShowAllInterests}
          user={state.users[state.activeIndex]}
        />
      )}
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
      {state.showModal ? (
        <NotificationModal
          ModalBody={<PreferencesComponent closeModal={closeModal} />}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
}
