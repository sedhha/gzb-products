import React, { useReducer, useEffect } from 'react';
import {
  reducer,
  initState,
  ConnectNavModes,
  ACTIONTYPES,
  navModes,
} from '@immediate-states/funfuse/connects.state';
import TopNavBar from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/TopNavBar/TopNavBar';
import ExistingConnections from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/ExistingConnections/ExistingConnections';
import RequestedConnections from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/NewRequests/Requests';
import { useAppSelector } from '@redux-tools/hooks';
import { rdb } from '@firebase-client/client.config';
import { ref, onValue, off } from 'firebase/database';
import { rdb_paths } from '@constants/firebase/paths';
import {
  addFriendinFunFuse,
  getFunFuseUserConnections,
  getFunFuseUserRequests,
  rejectFriendinFunFuse,
} from '@redux-apis/external/firestoreProfile';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { mode, newRequests, error } = state;
  const onModeChange = (mode: ConnectNavModes) => {
    if (mode === navModes.VIEW_REQUESTS)
      dispatch({
        type: ACTIONTYPES.SET_NEW_REQUESTS,
      });
    dispatch({ type: ACTIONTYPES.TOGGLE_MODE, payload: mode });
  };

  const { firebaseToken, isLoggedIn, user } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isLoggedIn && firebaseToken !== '') {
      const connectionsPath = `${rdb_paths.funfuse_connected_users}/${
        user?.uid ?? ''
      }`;
      const requestsPath = `${rdb_paths.funfuse_requests_users}/${
        user?.uid ?? ''
      }`;
      const connectionsRef = ref(rdb, connectionsPath);
      const requestsRef = ref(rdb, requestsPath);

      onValue(connectionsRef, (snapshot) => {
        if (snapshot.exists()) {
          if (firebaseToken) {
            dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
            getFunFuseUserConnections(firebaseToken)
              .then((data) => {
                dispatch({
                  type: ACTIONTYPES.SET_CONNECTIONS,
                  payload: data,
                });
                dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
              })
              .catch((error) => {
                console.log(
                  'Error Happened while updating connections = ',
                  error
                );
                dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
              });
          } else dispatch({ type: ACTIONTYPES.SET_CONNECTIONS, payload: [] });
        }
      });
      onValue(requestsRef, (snapshot) => {
        if (snapshot.exists()) {
          if (firebaseToken) {
            dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
            getFunFuseUserRequests(firebaseToken)
              .then((data) => {
                if (data.length) {
                  dispatch({
                    type: ACTIONTYPES.SET_NEW_REQUESTS,
                    payload: navModes.VIEW_REQUESTS,
                  });
                }
                dispatch({
                  type: ACTIONTYPES.SET_REQUESTS,
                  payload: data,
                });
                dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
              })
              .catch((error) => {
                console.log(
                  'Error Happened while updating connections = ',
                  error
                );
                dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
              });
          }
        } else dispatch({ type: ACTIONTYPES.SET_REQUESTS, payload: [] });
      });
      return () => {
        off(connectionsRef);
        off(requestsRef);
      };
    }
  }, [firebaseToken, isLoggedIn, user?.uid]);

  const errorHandler = (error: any) => {
    console.log('Error Happened in Managing Connects = ', error);
    dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
    dispatch({ type: ACTIONTYPES.SET_ERROR, payload: error.message });
  };
  const thenHandler = (response: { error: boolean; message?: string }) => {
    if (response.error) errorHandler(response);
    else {
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
      dispatch({ type: ACTIONTYPES.SET_ERROR, payload: '' });
    }
  };

  const onAcceptFriendRequst = (senderUid: string) => {
    if (firebaseToken) {
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
      addFriendinFunFuse(firebaseToken, senderUid)
        .then(thenHandler)
        .catch(errorHandler);
    }
  };

  const onRejectFriendRequst = (senderUid: string) => {
    if (firebaseToken) {
      dispatch({ type: ACTIONTYPES.SET_LOADING, payload: true });
      rejectFriendinFunFuse(firebaseToken, senderUid)
        .then(thenHandler)
        .catch(errorHandler);
    }
  };
  const isError = error !== '';

  let ResultComponent = (
    <ExistingConnections
      connections={state.connections}
      username={user?.username}
    />
  );
  switch (mode) {
    case navModes.VIEW_REQUESTS: {
      ResultComponent = (
        <RequestedConnections
          requests={state.reqUsers}
          username={user?.username}
          onAcceptFriendRequst={onAcceptFriendRequst}
          onRejectFriendRequst={onRejectFriendRequst}
        />
      );
      break;
    }
    default: {
    }
  }

  return (
    <div className='relative block h-full min-w-0 p-2 m-2'>
      {isError ? (
        <label className='m-2 mt-4 text-red-400 font-funfuse'>{error}</label>
      ) : null}
      <TopNavBar
        currentMode={mode}
        onModeChange={onModeChange}
        showNotifMode={newRequests}
      />
      {state.loading ? (
        <ResizeSpinner />
      ) : (
        <React.Fragment>
          <div className='flex flex-row items-center justify-around gap-2 overflow-hidden'>
            <div className='flex-auto drop-shadow-xl'>
              <input className='w-full p-0.5 border-t-gray-200 border-2 outline-none font-funfuse' />
            </div>
            <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
              <div className='funfuse-icons-search h-[1rem] w-[1rem] bg-white' />
            </div>
          </div>
          {ResultComponent}
        </React.Fragment>
      )}
    </div>
  );
}
