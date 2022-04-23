import { loginUser } from '@redux-slices/user';
import { useAppDispatch } from '@redux-tools/hooks';
import React, { useCallback, useEffect } from 'react';

type Props = {
  idToken: string;
  childComponent: JSX.Element;
};

export default function AuthWrapper({ idToken, childComponent }: Props) {
  const dispatch = useAppDispatch();

  const successHandler = useCallback(
    (token: string) => {
      dispatch(loginUser(token));
    },
    [dispatch]
  );

  useEffect(() => {
    if (idToken !== '') {
      successHandler(idToken);
    }
  }, [idToken, successHandler]);
  return childComponent;
}
