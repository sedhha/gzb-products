import {
  IResponse,
  IResponseCook,
  IResponseDetails,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';

import gzbResponses from '@constants/json/gzbresponse.json';

export const getErrorDetailsFromKey = (key: string): IResponseDetails => ({
  details:
    gzbResponses[key as keyof typeof gzbResponses]?.details ??
    gzbResponses['unknwon'].details,
  code:
    gzbResponses[key as keyof typeof gzbResponses]?.error_code ??
    gzbResponses['unknwon'].error_code,

  api_version:
    gzbResponses[key as keyof typeof gzbResponses]?.api_version ??
    gzbResponses['unknwon'].api_version,
  error:
    gzbResponses[key as keyof typeof gzbResponses]?.error ??
    gzbResponses['unknwon'].error,
});

export const getErrorMessageFromKey = (key: string): string =>
  gzbResponses[key as keyof typeof gzbResponses]?.details ??
  gzbResponses['unknwon'].details;

export const genericResponse = (payload: IResponseCook): IResponse => {
  console.debug(
    'r = ',
    payload.message ??
      payload.opsDetails?.details ??
      gzbResponses['unknwon'].details
  );
  return {
    status_code: payload.status_code ?? 200,
    data: payload.data ?? {},
    error: false,
    access_allowed: payload.access_allowed ?? false,
    session_expired: payload.session_expired ?? false,
    opsDetails: {
      error: payload.opsDetails?.error ?? gzbResponses['unknwon'].error,
      code: payload.opsDetails?.code ?? gzbResponses['unknwon'].code,
      details:
        payload.message ??
        payload.opsDetails?.details ??
        gzbResponses['unknwon'].details,
      api_version:
        payload.opsDetails?.api_version ?? gzbResponses['unknwon'].api_version,
    },
  };
};

export const errorResponse = (payload: IResponseCook): IResponse => {
  console.debug('Message = ', payload.message);
  return {
    status_code: payload.status_code ?? 401,
    data: payload.data ?? {},
    error: true,
    access_allowed: payload.access_allowed ?? false,
    session_expired: payload.session_expired ?? false,
    opsDetails: {
      error: payload.opsDetails?.error ?? gzbResponses['unknwon'].error,
      code: payload.opsDetails?.code ?? gzbResponses['unknwon'].code,
      details:
        payload.message ??
        payload.opsDetails?.details ??
        gzbResponses['unknwon'].details,
      api_version:
        payload.opsDetails?.api_version ?? gzbResponses['unknwon'].api_version,
    },
  };
};
