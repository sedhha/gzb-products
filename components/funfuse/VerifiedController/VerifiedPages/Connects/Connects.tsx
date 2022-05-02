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
import { getFunFuseUserConnections } from '@redux-apis/external/firestoreProfile';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { mode } = state;
  const onModeChange = (mode: ConnectNavModes) =>
    dispatch({ type: ACTIONTYPES.TOGGLE_MODE, payload: mode });

  const { firebaseToken, isLoggedIn, user } = useAppSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isLoggedIn && firebaseToken !== '') {
      const path = `${rdb_paths.funfuse_connected_users}/${user?.uid ?? ''}`;
      const connectionsRef = ref(rdb, path);

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
          }
        }
      });
      return () => {
        off(connectionsRef);
      };
    }
  }, [firebaseToken, isLoggedIn, user?.uid]);

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
        />
      );
      break;
    }
    default: {
    }
  }

  return (
    <div className='relative block h-full min-w-0 p-2 m-2'>
      <TopNavBar currentMode={mode} onModeChange={onModeChange} />
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
