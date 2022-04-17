import {
  ErrorCodes,
  IResponse,
  IResponseDetails,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import formValidator from '@global-backend/validators/forms';
import Server from '@firebase-server/server.config';
import { firebasePaths } from '@constants/firebase/paths';
import {
  IFunFuseRegisterUser,
  IFunFuseUserData,
} from '@constants/interfaces/funfuse';
import { FirebaseError } from 'firebase-admin';
const {
  isEmptyString,
  isPasswordStrong,
  isValidEmail,
  mustBeDefinedKey,
  isThirteenYearsOld,
  isValidGender,
} = formValidator;

/*
    X----------1. Validate if User Exists
    X----------1. Validate if Email is Correct
    X----------2. Validate if Password is Strong Enough
    X----------3. Validate if the Name is Correct
    3. Validate if the Age is more than 18 Years
    4. Validate the Gender Details

    Register the User

*/

const registerUser = async (
  payload: IFunFuseRegisterUser
): Promise<IResponseDetails> => {
  const keys = ['name', 'email', 'password', 'dob', 'gender'];
  const validPayload = mustBeDefinedKey(payload, keys);
  if (validPayload.error) {
    return getErrorDetailsFromKey(ErrorCodes.EMPTY_REQUIRED_FIELD);
  }
  const validEmail = isValidEmail(payload.email);
  if (!validEmail) {
    return getErrorDetailsFromKey(ErrorCodes.INVALID_EMAIL);
  }
  const validPassword = isPasswordStrong(payload.password);
  if (validPassword.error) {
    return validPassword;
  }

  const nameEmpty = isEmptyString(payload.name);
  if (nameEmpty.error) {
    return nameEmpty;
  }
  const is13orAbove = isThirteenYearsOld(payload.dob);
  if (!is13orAbove.isAbove13) {
    return getErrorDetailsFromKey(ErrorCodes.BELOW_THIRTEEN);
  }
  const validGender = await isValidGender(payload.gender);
  if (validGender.error) {
    return validGender;
  }
  return getErrorDetailsFromKey(ErrorCodes.FUNFUSE_REGISTRATION_SUCCESS);
};
const upsertUserNameToDb = async (username: string): Promise<boolean> => {
  const usernameRef = Server.rdb.ref('funfuse-usernames');
  return usernameRef
    .child(username)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) return false;
      else {
        return true;
      }
    });
};
const addUserNameSlug = async (username: string): Promise<boolean> => {
  const usernameRef = Server.rdb.ref('funfuse-usernames');
  await usernameRef.child(username).set(true);
  return true;
};

export const registerFunFuseUser = async (
  payload: IFunFuseRegisterUser
): Promise<IResponse> => {
  const response = await registerUser(payload);
  if (response.error) {
    return errorResponse({ opsDetails: response });
  }
  const details = await upsertUserNameToDb(payload.username);
  if (details) {
    try {
      const userRecord = await Server.auth.createUser({
        displayName: payload.name,
        email: payload.email,
        password: payload.password,
      });
      const userData: IFunFuseUserData = {
        name: payload.name,
        email: payload.email,
        dob: payload.dob,
        gender: payload.gender,
        username: payload.username,
        role: 'User',
      };

      await Promise.all([
        Server.auth.setCustomUserClaims(userRecord.uid, userData),
        Server.db
          .doc(`${firebasePaths.funfuse_users}/${userRecord.uid}`)
          .set(userData, { merge: true }),
        addUserNameSlug(payload.username),
      ]);
      return genericResponse({ opsDetails: response });
    } catch (error) {
      return errorResponse({
        opsDetails: {
          ...getErrorDetailsFromKey(ErrorCodes.FIREBASE_GENERATED_ERROR),
          details: (error as FirebaseError).message,
        },
      });
    }
  }
  return errorResponse({
    opsDetails: getErrorDetailsFromKey(ErrorCodes.USERNAME_ALREADY_EXISTS),
  });
};