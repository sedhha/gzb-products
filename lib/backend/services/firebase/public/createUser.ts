import {
  IFirebaseCreation,
  IFirebaseUserMinimal,
} from '@constants/interfaces/firebase/Auth.interfaces';
import { FirebaseError } from 'firebase-admin';
import Server from '@firebase-server/server.config';

import firebaseJson from '@jsons/firebase.json';
import responseTypes from '@jsons/gzbresponse.json';

import { firebaseErrorTranslater } from './errorTranslator';
import {
  IResponse,
  IResponseDetails,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import {
  errorResponse,
  genericResponse,
} from '@global-backend/utils/api/responseSynthesizer';
import {
  isPasswordStrong,
  isValidGender,
  isEmptyString,
  firebaseSuspectedError,
} from '@global-backend/validators/forms';
import FirebaseLikeError from '@constants/firebase/errors';

const validateGZBFirebaseUser = async (
  user: IFirebaseUserMinimal
): Promise<IResponseDetails> => {
  const { password, displayName, gender } = user;

  const strongPassword = isPasswordStrong(password);
  if (strongPassword.error) return strongPassword;

  const validGender = await isValidGender(gender);
  if (validGender.error) return validGender;

  const validName = isEmptyString(displayName);
  if (validName.error) return validName;

  return {
    error: false,
    code: responseTypes.gzb_registration_success.code,
    details: responseTypes.gzb_registration_success.details,
    api_version: responseTypes.gzb_registration_success.api_version,
  };
};
export const createFirebaseUser = async (
  user: IFirebaseUserMinimal
): Promise<IResponse> => {
  //Validate User Details
  const validPayload = await validateGZBFirebaseUser(user);
  if (validPayload.error) return errorResponse({ opsDetails: validPayload });

  const data: IFirebaseCreation = {
    email: user.email,
    password: user.password,
    displayName: user.displayName,
    photoURL: user.gender.toLowerCase().includes('female')
      ? firebaseJson.default_user_details.female_avatar
      : firebaseJson.default_user_details.male_avatar,
    disabled: false,
    emailVerified: false,
  };
  try {
    if (user.errorTest) {
      throw new FirebaseLikeError('Mock Error From Jest', {
        code: 'auth/user-not-found',
      });
    }
    await Server.auth.createUser(data);
    return genericResponse({
      opsDetails: {
        error: responseTypes.gzb_registration_success.error,
        code: responseTypes.gzb_registration_success.error_code,
        details: responseTypes.gzb_registration_success.details,
        api_version: responseTypes.gzb_registration_success.api_version,
      },
    });
  } catch (e) {
    const error = e as FirebaseError;
    const errorMessage = firebaseErrorTranslater(error.code);
    const opsDetails = firebaseSuspectedError(errorMessage);
    return errorResponse({ opsDetails });
  }
};
