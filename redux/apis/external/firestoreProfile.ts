import {
  IFunfuseFrontendUser,
  IFunFuseProfileUpdate,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { IFunFuseUserData } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { FirebaseError } from 'firebase/app';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@firebase-client/client.config';

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

export const updateFireStoreProfile = async (
  token: string,
  data: IFunFuseProfileUpdate
): Promise<{ error: boolean; message?: string }> => {
  return await fetch('/api/funfuse/ops/update-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(data),
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
          };
        })
        .catch((error) => ({ error: true, message: error.message }))
    )
    .catch((error) => ({ error: true, message: error.message }));
};

export const discoverFirebaseUsers = async (
  firebaseToken: string,
  startIndex: number,
  endIndex: number
): Promise<IFunfuseFrontendUser[]> => {
  const data = await fetch('/api/funfuse/ops/discover-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': firebaseToken,
    },
    body: JSON.stringify({
      startIndex,
      endIndex,
    }),
  })
    .then((response) =>
      response
        .json()
        .then((payload: IResponse) => {
          if (!payload.error) return payload.data as IFunfuseFrontendUser[];
          else return errorHandler(payload);
        })
        .catch(errorHandler)
    )
    .catch(errorHandler);
  return data;
};

export const connectToFunFuseUser = async (
  firebaseToken: string,
  recieverUid: string
) => {
  return fetch('/api/funfuse/ops/connect-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': firebaseToken,
    },
    body: JSON.stringify({
      recieverUid,
    }),
  })
    .then((response) =>
      response
        .json()
        .then((data) => {
          if (data.error) {
            errorHandler(data);
            return false;
          }
          return true;
        })
        .catch((error) => {
          errorHandler(error);
          return false;
        })
    )
    .catch((error) => {
      errorHandler(error);
      return false;
    });
};

export const getFunFuseUserConnections = async (
  firebaseToken: string
): Promise<IFunfuseFrontendUser[]> =>
  fetch('/api/funfuse/ops/get-connections', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': firebaseToken,
    },
  }).then((response) =>
    response
      .json()
      .then((data) => {
        if (data.error) {
          errorHandler(data);
          return [];
        }
        return data.data as IFunfuseFrontendUser[];
      })
      .catch(errorHandler)
  );

const errorHandler = (error: any) => {
  console.log('Error = ', error);
  return [];
};
