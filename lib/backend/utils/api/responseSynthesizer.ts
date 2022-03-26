import {
  IResponse,
  IResponseCook,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';

export const genericResponse = (payload: IResponseCook): IResponse => ({
  status_code: payload.status_code ?? 200,
  message: payload.message ?? '',
  data: payload.data ?? {},
  error: false,
  access_allowed: payload.access_allowed ?? false,
  session_expired: payload.session_expired ?? false,
});

export const errorResponse = (payload: IResponseCook): IResponse => ({
  status_code: payload.status_code ?? 401,
  message: payload.message ?? '',
  data: payload.data ?? {},
  error: true,
  access_allowed: payload.access_allowed ?? false,
  session_expired: payload.session_expired ?? false,
});
