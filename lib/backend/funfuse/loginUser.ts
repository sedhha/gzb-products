import {
  IUserState,
  IFunFuseUserData,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import Server from '@firebase-server/server.config';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { FirebaseError } from 'firebase-admin';

export const loginUser = async (idToken: string): Promise<IResponse> => {
  try {
    const decodedToken = await Server.auth.verifyIdToken(idToken);
    const payload: IUserState = {
      isLoggedIn: true,
      firebaseToken: idToken,
      user: decodedToken as unknown as IFunFuseUserData,
    };
    const opsDetails = getErrorDetailsFromKey(ErrorCodes.FUNFUSE_LOGIN_SUCCESS);
    return genericResponse({
      opsDetails,
      data: payload,
      message: opsDetails.details,
    });
  } catch (e) {
    return errorResponse({
      data: { isLoggedIn: false },
      opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_SUSPECTED_ERROR),
      message: (e as FirebaseError).message,
    });
  }
};