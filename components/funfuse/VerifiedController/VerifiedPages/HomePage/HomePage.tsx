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
import {
  connectToFunFuseUser,
  discoverFirebaseUsers,
} from '@redux-apis/external/firestoreProfile';
import UserCard from '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/UserCard/UserCard';
import Image from 'next/image';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';

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

  const onProfileNextHandler = () => {
    if (state.activeIndex >= state.users.length) return;
    if (firebaseToken) {
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
      const uid = state.users[state.activeIndex].uid;
      connectToFunFuseUser(firebaseToken, uid)
        .then((response) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          if (response) {
            dispatch({ type: ACTIONTYPES.GO_NEXT });
          }
        })
        .catch((error) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          console.log(error);
        });
    }
  };
  const onSkipHandler = () => {
    if (state.activeIndex >= state.users.length) return;
    dispatch({ type: ACTIONTYPES.GO_NEXT });
  };

  useEffect(() => {
    if (isLoggedIn && firebaseToken) {
      discoverFirebaseUsers(firebaseToken, 0, 20).then((data) => {
        dispatch({ type: ACTIONTYPES.SET_USERS, payload: data });
      });
    }
  }, [firebaseToken, isLoggedIn]);

  const user = state.users[state.activeIndex];
  return (
    <div className='flex flex-col items-center justify-around w-full h-full gap-1'>
      {state.users.length > 0 &&
        state.activeIndex < state.users.length &&
        (state.isLoading ? (
          <ResizeSpinner />
        ) : (
          <UserCard
            showAllSkills={state.showAllSkills}
            showAllInterests={state.showAllInterests}
            modifyShowAllSkills={modifyShowAllSkills}
            modifyShowAllInterests={modifyShowAllInterests}
            user={user}
          />
        ))}
      {state.activeIndex >= state.users.length ? (
        <div className='flex flex-col items-center justify-center flex-auto p-4'>
          <Image
            src='/funfuse/no-profiles.svg'
            alt='End of the road'
            layout='fixed'
            height={200}
            width={200}
            priority
          />
          <label className='font-semibold text-center text-funfuse font-md font-funfuse'>
            That&apos;s all for now! Check back later for more funfused
            community!
          </label>
        </div>
      ) : (
        <React.Fragment>
          <label
            onClick={() => setShowModal(true)}
            className='flex-0.5 mb-1 text-sm text-center text-indigo-500 underline underline-offset-1 font-funfuse'>
            Update Preferences
          </label>
          <div className='flex flex-row items-center justify-around flex-1 w-full gap-2 px-2'>
            <ThemeButton
              buttonText={'Skip'}
              buttonCallback={onSkipHandler}
              twClass='bg-funfuse_red rounded-md flex-1 p-0'
            />

            <div className='h-[4rem] w-[4rem]'>
              <SwapIcon
                onLeftDragHandler={onSkipHandler}
                onRightDragHandler={onProfileNextHandler}
                minDragMagnitude={80}
              />
            </div>
            <ThemeButton
              buttonText={'Connect'}
              buttonCallback={onProfileNextHandler}
              twClass='rounded-md flex-1 p-0'
            />
          </div>
        </React.Fragment>
      )}
      {state.showModal ? (
        <NotificationModal
          ModalBody={<PreferencesComponent closeModal={closeModal} />}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
}
