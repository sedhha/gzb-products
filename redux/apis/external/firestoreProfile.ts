import { IFunFuseUserData } from '@constants/interfaces/funfuse';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { FirebaseError } from 'firebase/app';

export const firestoreProfile = async (
  token: string
): Promise<{ error: boolean; data?: IFunFuseUserData; message?: string }> => {
  return await fetch('/api/funfuse/ops/get-user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => {
          if (data.error) {
            return {
              error: true,
              message: data.opsDetails.details,
            };
          }
          return {
            error: false,
            data: data.data as IFunFuseUserData,
          };
        })
        .catch((error) => ({
          error: true,
          message: (error as FirebaseError).message,
        }))
    )
    .catch((error) => {
      return {
        error: true,
        message: error.message,
      };
    });
};
