import {
  reducer,
  initState,
  ACTIONTYPES,
} from '@immediate-states/funfuse/messages.state';
import React from 'react';
import MessageBox from './MessageBox';
import { useAppSelector } from '@redux-tools/hooks';
import { rdb_paths } from '@constants/firebase/paths';
import { ref, onValue, off } from 'firebase/database';
import { rdb } from '@firebase-client/client.config';
import IMessage from '@/components/funfuse/IllustrationMessage/IMessage';
import { useRouter } from 'next/router';
import { verifiedRoutes } from '@/components/funfuse/constants/verifiedRoutes';

export default function HomePage() {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  React.useEffect(() => {
    if (user?.uid) {
      const path = `${rdb_paths.funfuse_user_messages}/${user?.uid}`;
      const messageRef = ref(rdb, path);
      onValue(messageRef, (snapshot) => {
        if (snapshot.exists()) {
          dispatch({
            type: ACTIONTYPES.UPDATE_MESSAGES,
            payload: Object.values(snapshot.val()),
          });
        }
      });
      return () => off(messageRef);
    }
  }, [user?.uid]);
  return (
    <div className='block h-full min-w-0 p-2 m-2'>
      <div className='flex flex-row items-center justify-around gap-2 overflow-hidden'>
        <div className='flex-auto drop-shadow-xl'>
          <input className='w-full p-0.5 border-t-gray-200 border-2 outline-none font-funfuse' />
        </div>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div className='funfuse-icons-search h-[1rem] w-[1rem] bg-white' />
        </div>
      </div>
      <div className='flex flex-col items-center gap-2 mt-4'>
        {state.messages.map((message, index) => (
          <MessageBox key={index} {...message} />
        ))}
        {state.messages.length <= 0 && (
          <IMessage
            src={'/funfuse/no-conversations.svg'}
            alt={'No Connections'}
            JSXMessageComponent={
              <label className='text-center text-gray-400 font-md font-funfuse'>
                It&apos;s too quiet here. Talk to your{' '}
                <span
                  className='underline decoration-funfuse text-funfuse underline-offset-2'
                  onClick={() => {
                    router.push(
                      `/funfuse/${user?.username}/${verifiedRoutes.CONNECTS_ROUTE}`
                    );
                  }}>
                  connections
                </span>{' '}
                and grow with them together!
              </label>
            }
          />
        )}
      </div>
    </div>
  );
}
