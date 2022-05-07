import {
  IFunfuseFrontendUser,
  IFunFuseProfileUpdate,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { IFunFuseUserData } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import {
  IFunFuseInvitePayload,
  IFunFuseMentorRDBConfig,
} from '@constants/interfaces/funfuse/backend/Dyte.interfaces';
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

export const getFunFuseUserRequests = async (
  firebaseToken: string
): Promise<IFunfuseFrontendUser[]> =>
  fetch('/api/funfuse/ops/get-requests', {
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

export const addFriendinFunFuse = async (
  firebaseToken: string,
  requestorUid: string
): Promise<{ error: boolean; message?: string }> =>
  fetch('/api/funfuse/ops/add-friend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': firebaseToken,
    },
    body: JSON.stringify({
      requestorUid,
    }),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => {
          if (data.error)
            return { error: true, message: data.opsDetails.details };
          return { error: false };
        })
        .catch(booleanErrorHandler)
    )
    .catch(booleanErrorHandler);

export const rejectFriendinFunFuse = async (
  firebaseToken: string,
  requestorUid: string
): Promise<{ error: boolean; message?: string }> =>
  fetch('/api/funfuse/ops/reject-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': firebaseToken,
    },
    body: JSON.stringify({
      requestorUid,
    }),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => {
          if (data.error)
            return { error: true, message: data.opsDetails.details };
          return { error: false };
        })
        .catch(booleanErrorHandler)
    )
    .catch(booleanErrorHandler);

const errorHandler = (error: any) => {
  console.log('Error = ', error);
  return [];
};
const booleanErrorHandler = (
  error: any
): { error: boolean; message: string } => {
  console.log('Error = ', error);
  return { error: true, message: error.message };
};
const genericerrorHandler = <T>(error: any, returnValue: T): T => {
  console.log('Error = ', error);
  return returnValue;
};

export const getFunFuseUser = (firebaseToken: string, userUid: string) =>
  fetch('/api/funfuse/ops/view-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': firebaseToken,
    },
    body: JSON.stringify({
      userUid,
    }),
  })
    .then((response) =>
      response
        .json()
        .then((result: IResponse) => {
          if (result.error) return genericerrorHandler(result, {});
          return result.data as IFunfuseFrontendUser;
        })
        .catch((error) =>
          genericerrorHandler(error, {} as IFunfuseFrontendUser)
        )
    )
    .catch((error) => genericerrorHandler(error, {} as IFunfuseFrontendUser));

export const discoverFunFuseMentors = async (
  firebaseToken: string,
  startIndex: number,
  endIndex: number
): Promise<IFunfuseFrontendUser[]> => {
  const data = await fetch('/api/funfuse/ops/discover-mentor', {
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

export const requestMeetingCall = async (
  accessToken: string,
  payload: IFunFuseInvitePayload
): Promise<{ error: boolean; message: string }> => {
  return fetch('/api/funfuse/ops/request-meeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
    body: JSON.stringify(payload),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => {
          if (data.error) {
            return { error: true, message: data.opsDetails.details };
          }
          return { error: false, message: data.opsDetails.details };
        })
        .catch((error) => {
          console.log('Error = ', error);
          return {
            error: true,
            message: 'Unable to Decode the Server Response.',
          };
        })
    )
    .catch((error) => ({
      error: true,
      message:
        'Unable to Request Data from Backend Video Server! ' + error.message,
    }));
};

export const acceptMeetingCall = async (
  accessToken: string,
  payload: IFunFuseMentorRDBConfig
): Promise<{ error: boolean; message: string }> => {
  return fetch('/api/funfuse/ops/accept-meeting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
    body: JSON.stringify(payload),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => {
          if (data.error) {
            errorHandler(data);
            return { error: true, message: data.opsDetails.details };
          }
          return { error: false, message: data.opsDetails.details };
        })
        .catch((error) => {
          errorHandler(error);
          return {
            error: true,
            message: 'Unable to Get Appropriate Server Response',
          };
        })
    )
    .catch((error) => {
      errorHandler(error);
      return {
        error: true,
        message: 'Unable to Get Appropriate Server Response',
      };
    });
};

export const endMeetingCall = async (
  firebaseToken: string
): Promise<{ error: boolean; message: string }> =>
  fetch('/api/funfuse/ops/end-meeting', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': firebaseToken,
    },
  })
    .then((response) =>
      response
        .json()
        .then((data) => {
          if (data.error) {
            return { error: true, message: data.opsDetails.details };
          }
          return { error: false, message: '' };
        })
        .catch((error) => {
          console.log('Error = ', error);
          return { error: true, message: 'Unable to End Meeting' };
        })
    )
    .catch((error) => {
      console.log('Error While Ending meeting call = ', error);
      return { error: true, message: error.message };
    });
