import React, { useReducer } from 'react';
import {
  reducer,
  initState,
  ConnectNavModes,
  ACTIONTYPES,
} from '@immediate-states/funfuse/connects.state';
import TopNavBar from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/TopNavBar/TopNavBar';
import ExistingConnections from '@/components/funfuse/VerifiedController/VerifiedPages/Connects/ExistingConnections/ExistingConnections';

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { mode } = state;
  const onModeChange = (mode: ConnectNavModes) =>
    dispatch({ type: ACTIONTYPES.TOGGLE_MODE, payload: mode });

  return (
    <div className='relative block h-full min-w-0 p-2 m-2'>
      <TopNavBar currentMode={mode} onModeChange={onModeChange} />
      <div className='flex flex-row items-center justify-around gap-2 overflow-hidden'>
        <div className='flex-auto drop-shadow-xl'>
          <input className='w-full p-0.5 border-t-gray-200 border-2 outline-none font-funfuse' />
        </div>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div className='funfuse-icons-search h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
      <ExistingConnections />
    </div>
  );
}
