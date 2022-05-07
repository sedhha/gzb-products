import React, { useReducer } from 'react';
import {
  reducer,
  initState,
  ACTIONTYPES,
  navModes,
  navModeToIconMap,
  ConnectNavModes,
  IMentorRequests,
} from '@immediate-states/funfuse/mentorship.state';
import TopNavBar from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/TopNavBar/TopNavBar';
import { useAppSelector } from '@redux-tools/hooks';
import {
  acceptMeetingCall,
  discoverFunFuseMentors,
} from '@redux-apis/external/firestoreProfile';
import dynamic from 'next/dynamic';
import { storage, rdb } from '@firebase-client/client.config';
import { ref, getDownloadURL } from 'firebase/storage';
import {
  onChildAdded,
  get,
  ref as dbref,
  off,
  onValue,
} from 'firebase/database';
import { requestMeetingCall } from '@redux-apis/external/firestoreProfile';
import { rdb_paths } from '@constants/firebase/paths';
import SessionRequests from '@/components/funfuse/VerifiedController/VerifiedPages/Mentorship/SessionRequests';
import {
  IFunFuseAddToMeeting,
  IFunFuseMentorRDBConfig,
} from '@constants/interfaces/funfuse/backend/Dyte.interfaces';
import { FirebaseError } from 'firebase/app';

const MentorScreen = dynamic(
  () =>
    import(
      '@/components/funfuse/VerifiedController/VerifiedPages/Mentorship/Mentors'
    )
);

const DyteScreen = dynamic(
  () =>
    import(
      '@/components/funfuse/VerifiedController/VerifiedPages/Mentorship/DyteCall'
    )
);

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initState);

  const { firebaseToken, isLoggedIn, displayPicture, user } = useAppSelector(
    (state) => state.user
  );

  React.useEffect(() => {
    if (isLoggedIn && firebaseToken) {
      discoverFunFuseMentors(firebaseToken, 0, 20).then((data) => {
        dispatch({ type: ACTIONTYPES.SET_USERS, payload: data });
      });
    }
  }, [firebaseToken, isLoggedIn]);

  React.useEffect(() => {
    if (user) {
      const pendingRef = `${rdb_paths.funfuse_meeting_users_pending}/${user?.uid}`;
      const dbRef = dbref(rdb, pendingRef);
      const liveRef = dbref(
        rdb,
        `${rdb_paths.funfuse_meeting_users_live}/${user?.uid}`
      );
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
      get(dbRef)
        .then((snapshot) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          dispatch({
            type: ACTIONTYPES.UPDATE_ERROR_MESSAGES,
            payload: undefined,
          });
          if (snapshot.exists()) {
            const newRequests = snapshot.val();
            dispatch({
              type: ACTIONTYPES.UPDATE_REQUESTS,
              payload: newRequests as IMentorRequests,
            });
          }
        })
        .catch((error: FirebaseError) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          console.log(error);
          dispatch({
            type: ACTIONTYPES.UPDATE_ERROR_MESSAGES,
            payload: error.message,
          });
        });
      onChildAdded(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          const newRequest = snapshot.val();
          dispatch({
            type: ACTIONTYPES.UPDATE_REQUESTS,
            payload: {
              ...state.requests,
              newRequest,
            },
          });
        }
      });
      onValue(liveRef, (snapshot) => {
        if (snapshot.exists()) {
          const liveMeetingData = snapshot.val();
          dispatch({ type: ACTIONTYPES.UPDATE_IN_CALL, payload: true });
          dispatch({
            type: ACTIONTYPES.UPDATE_IN_CALL_DETAILS,
            payload: liveMeetingData,
          });
        }
      });
      return () => {
        off(dbRef, 'child_added');
        off(liveRef);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);
  const modifyShowAllSkills = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_SKILLS_MODIFY, payload: show });
  const modifyShowAllInterests = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_INTERESTS_MODIFY, payload: show });
  // const closeModal = () => setShowModal(false);

  const onSkipHandler = () => {
    if (state.activeIndex >= state.users.length) return;
    dispatch({ type: ACTIONTYPES.GO_NEXT });
  };

  const onInviteToMeetHandler = () => {
    if (state.activeIndex >= state.users.length) return;
    dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
    const mentor_uid = state.users[state.activeIndex].uid;
    const imageUrl = state.users[state.activeIndex].imageLoc;
    if (imageUrl) {
      const storageRef = ref(storage, imageUrl);
      getDownloadURL(storageRef)
        .then((url) => {
          requestMeetingCall(firebaseToken ?? '', {
            mentor_uid,
            creatorUrl: displayPicture ?? url,
            creator_uid: user?.uid ?? '',
            mentorUrl: url,
            creatorName: user?.name ?? '',
            mentorName: state.users[state.activeIndex].name ?? '',
          } as IFunFuseAddToMeeting)
            .then((response) => {
              dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
              if (response.error) {
                dispatch({
                  type: ACTIONTYPES.UPDATE_ERROR_MESSAGES,
                  payload: response.message,
                });
              } else
                dispatch({
                  type: ACTIONTYPES.RESET_ERROR_MESSAGES,
                });
            })
            .catch((error) => {
              console.log('Error = ', error);
              dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
              dispatch({
                type: ACTIONTYPES.UPDATE_ERROR_MESSAGES,
                payload: error.message,
              });
            });
        })
        .catch((error) => {
          console.log('Error Loading Image from Storage: ', error);
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          dispatch({
            type: ACTIONTYPES.UPDATE_ERROR_MESSAGES,
            payload: error.message ?? 'Error Loading Image from Storage',
          });
        });
    }
  };

  const onModeChange = (mode: string) => {
    dispatch({
      type: ACTIONTYPES.TOGGLE_MODE,
      payload: mode as ConnectNavModes,
    });
  };

  const onCallAcceptHandler = (acceptPayload: IFunFuseMentorRDBConfig) => {
    dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
    if (firebaseToken)
      acceptMeetingCall(firebaseToken, acceptPayload)
        .then((data) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          if (data.error) {
            console.log('Failed to Create Room = ', data);
            dispatch({
              type: ACTIONTYPES.UPDATE_ERROR_MESSAGES,
              payload: data.message,
            });
          }
          dispatch({
            type: ACTIONTYPES.RESET_ERROR_MESSAGES,
          });
        })
        .catch((error) => {
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
          console.log('Failed to Create Room = ', error);
        });
    else {
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
      dispatch({
        type: ACTIONTYPES.UPDATE_ERROR_MESSAGES,
        payload: "You're not logged in or Login Session has expired!",
      });
    }
  };
  const updateOnCallStatus = (status: boolean) => {
    dispatch({ type: ACTIONTYPES.UPDATE_IN_CALL, payload: status });
    dispatch({ type: ACTIONTYPES.UPDATE_REQUESTS, payload: {} });
    dispatch({
      type: ACTIONTYPES.TOGGLE_MODE,
      payload: navModes.DISCOVER_MENTORS,
    });
    dispatch({ type: ACTIONTYPES.RESET_ERROR_MESSAGES });
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
  const isError = state.errorMessage !== undefined;
  switch (state.mode) {
    case navModes.VIEW_REQUESTS:
      RenderComponent = (
        <SessionRequests
          requests={state.requests}
          requestsCount={state.requestsCount}
          onCallAcceptHandler={onCallAcceptHandler}
        />
      );
      break;
  }
  return (
    <div className='relative block h-full min-w-0 p-2 m-2'>
      {state.inCall ? (
        <DyteScreen
          meeting={state.callDetails}
          updateInCallStatus={updateOnCallStatus}
        />
      ) : (
        <React.Fragment>
          <TopNavBar
            onModeChange={onModeChange}
            currentMode={state.mode}
            navModeToIconMap={navModeToIconMap}
            showNotifMode={
              state.mode !== navModes.VIEW_REQUESTS && state.requestsCount > 0
                ? navModes.VIEW_REQUESTS
                : ''
            }
          />
          {isError ? (
            <label className='m-2 mt-4 text-red-400 font-funfuse'>
              {state.errorMessage}
            </label>
          ) : null}
          {RenderComponent}
        </React.Fragment>
      )}
    </div>
  );
}
