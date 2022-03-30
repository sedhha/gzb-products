import { IFirebaseUserMinimal } from '@constants/interfaces/firebase/Auth.interfaces';
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
import { createFirebaseUser } from './createUser';

export const checkIfEmailExists = async (email: string): Promise<boolean> => {
  return Server.auth
    .getUserByEmail(email)
    .then(() => true)
    .catch(() => false);
};

export const registerWithGZB = async (
  data: IFirebaseUserMinimal
): Promise<IResponse> => {
  const { email } = data;
  const doesEmailExist = await checkIfEmailExists(email);
  if (doesEmailExist) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.EMAIL_EXISTS),
    });
  } else {
    return await createFirebaseUser(data);
  }
};
