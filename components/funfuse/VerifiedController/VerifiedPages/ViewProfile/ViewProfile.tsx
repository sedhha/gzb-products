import { useAppSelector } from '@redux-tools/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import UserCard from '@/components/funfuse/VerifiedController/VerifiedPages/HomePage/UserCard/UserCard';

import {
  initState,
  reducer,
  ACTIONTYPES,
} from '@immediate-states/funfuse/profile.state';
import { getFunFuseUser } from '@redux-apis/external/firestoreProfile';
import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import ResizeSpinner from '@/components/funfuse/Spinner/ResizeSpinner';

const ViewProfile = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const router = useRouter();
  const userUid = router.query.viewerUid as string;
  const modifyShowAllSkills = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_SKILLS_MODIFY, payload: show });
  const modifyShowAllInterests = (show: boolean) =>
    dispatch({ type: ACTIONTYPES.SHOW_INTERESTS_MODIFY, payload: show });
  const { firebaseToken } = useAppSelector((state) => state.user);
  console.log('User Id = ', userUid);

  useEffect(() => {
    if (firebaseToken && firebaseToken !== '' && userUid && userUid !== '')
      getFunFuseUser(firebaseToken, userUid)
        .then((result) => {
          console.log('Result = ', result);
          if ((result as IFunfuseFrontendUser).name)
            dispatch({
              type: ACTIONTYPES.SET_USER,
              payload: result as IFunfuseFrontendUser,
            });
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
        })
        .catch((error) => {
          console.log('Caused Error while fetching data = ', error);
          dispatch({ type: ACTIONTYPES.SET_LOADING, payload: false });
        });
  }, [firebaseToken, userUid]);

  return state.isLoading ? (
    <ResizeSpinner />
  ) : (
    <div className='flex flex-col items-center justify-around w-full h-full gap-1'>
      <div className='flex justify-end w-full px-2 mt-2'>
        <div className='h-[2rem] w-[2rem] flex justify-center items-center bg-funfuse rounded-md'>
          <div
            className='funfuse-icons-back h-[1rem] w-[1rem] bg-white'
            onClick={() => {
              router.back();
            }}
          />
        </div>
      </div>
      <UserCard
        showAllSkills={state.showAllSkills}
        showAllInterests={state.showAllInterests}
        modifyShowAllSkills={modifyShowAllSkills}
        modifyShowAllInterests={modifyShowAllInterests}
        user={state.user}
      />
    </div>
  );
};
export default ViewProfile;
