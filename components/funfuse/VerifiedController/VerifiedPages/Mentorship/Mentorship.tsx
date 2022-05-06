import React, { useReducer } from 'react';
import {
  reducer,
  initState,
  ACTIONTYPES,
  navModes,
  navModeToIconMap,
  ConnectNavModes,
} from '@immediate-states/funfuse/mentorship.state';
import TopNavBar from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/TopNavBar/TopNavBar';
import { useAppSelector } from '@redux-tools/hooks';
import { discoverFunFuseMentors } from '@redux-apis/external/firestoreProfile';
import dynamic from 'next/dynamic';
// import { DyteMeeting, Meeting } from 'dyte-client';

const MentorScreen = dynamic(
  () =>
    import(
      '@/components/funfuse/VerifiedController/VerifiedPages/Mentorship/Mentors'
    )
);

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initState);

  const { firebaseToken, isLoggedIn } = useAppSelector((state) => state.user);

  React.useEffect(() => {
    if (isLoggedIn && firebaseToken) {
      discoverFunFuseMentors(firebaseToken, 0, 20).then((data) => {
        dispatch({ type: ACTIONTYPES.SET_USERS, payload: data });
      });
    }
  }, [firebaseToken, isLoggedIn]);
  const modifyShowAllSkills = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_SKILLS_MODIFY, payload: show });
  const modifyShowAllInterests = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_INTERESTS_MODIFY, payload: show });
  const user = state.users[state.activeIndex];
  const setShowModal = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.MODAL_MODIFY, payload: show });
  const closeModal = () => setShowModal(false);

  const onSkipHandler = () => {
    if (state.activeIndex >= state.users.length) return;
    dispatch({ type: ACTIONTYPES.GO_NEXT });
  };

  const onInviteToMeetHandler = () => {};

  const onModeChange = (mode: string) => {
    dispatch({
      type: ACTIONTYPES.TOGGLE_MODE,
      payload: mode as ConnectNavModes,
    });
  };
  let RenderComponent = (
    <MentorScreen
      users={state.users}
      activeIndex={state.activeIndex}
      showAllSkills={state.showAllSkills}
      showAllInterests={state.showAllInterests}
      modifyShowAllSkills={modifyShowAllSkills}
      modifyShowAllInterests={modifyShowAllInterests}
      onSkipHandler={onSkipHandler}
      onInviteToMeetHandler={onInviteToMeetHandler}
      firebaseToken={firebaseToken}
      isLoggedIn={isLoggedIn}
      isLoading={state.isLoading}
    />
  );
  switch (state.mode) {
    case navModes.VIEW_REQUESTS:
      RenderComponent = <div>Requests</div>;
      break;
  }
  return (
    <div className='relative block h-full min-w-0 p-2 m-2'>
      <TopNavBar
        onModeChange={onModeChange}
        currentMode={state.mode}
        navModeToIconMap={navModeToIconMap}
      />
      {RenderComponent}
    </div>
  );
}
