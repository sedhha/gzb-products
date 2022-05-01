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
  const imageUrlPromises = data.map(
    (element) =>
      new Promise((resolve) => {
        if (element.isImageAvailable) {
          const storageRef = ref(storage, element.imageLoc);
          getDownloadURL(storageRef).then((url) => {
            element.imageLoc = url;
          });
        }
        resolve(element);
      })
  );
  const result = await Promise.all(imageUrlPromises).then(
    (data) => data as IFunfuseFrontendUser[]
  );
  return result;
};

const errorHandler = (error: any) => {
  console.log('Error = ', error);
  return [];
};
