import { IAgeValidation } from '@constants/interfaces/gcorn/backend/apis/registerAPI.interfaces';
import {
  ErrorCodes,
  IResponseDetails,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { getErrorDetailsFromKey } from '@global-backend/utils/api/responseSynthesizer';
import metadata from '../services/firebase/public/metadata';
import responseTypes from '@jsons/gzbresponse.json';

export const isPasswordStrong = (password: string): IResponseDetails => {
  //Atleast 8 characters
  if (password.length < 8)
    return getErrorDetailsFromKey(ErrorCodes.PASSWORD_LESS_THAN_8_CHARACTERS);

  //Must have atleast one uppercase Letter
  if (!password.match(/[A-Z]/))
    return getErrorDetailsFromKey(ErrorCodes.PASSWORD_NOT_HAVING_UPPERCASE);

  //Must have at least one lowercase Letter
  if (!password.match(/[a-z]/))
    return getErrorDetailsFromKey(ErrorCodes.PASSWORD_NOT_HAVING_LOWERCASE);

  //Must have at least one number
  if (!password.match(/[0-9]/))
    return getErrorDetailsFromKey(ErrorCodes.PASSWORD_NO_NUMBERS);

  //Must contain one of the following characters: ! @ # ? ]
  if (!password.match(/[!@#$?]/))
    return getErrorDetailsFromKey(
      ErrorCodes.PASSOWRD_MISSING_SPECIAL_CHARACTER
    );
  //Must not contain < or >
  if (password.match(/[<>]/))
    return getErrorDetailsFromKey(ErrorCodes.PASSWORD_HAVING_ARROW_BRACKETS);

  //Must be less than 16 characters long
  if (password.length > 16)
    return getErrorDetailsFromKey(ErrorCodes.PASSWORD_EXCEEDING_16_CHARACTERS);

  return getErrorDetailsFromKey(ErrorCodes.GCORN_REGISTRATION_SUCCESS);
};

export const isValidEmail = (email: string) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

export const isValidGender = async (
  gender: string
): Promise<IResponseDetails> => {
  const validGender = (await metadata).gender.includes(gender);
  return !validGender
    ? getErrorDetailsFromKey(ErrorCodes.INVALID_GENDER)
    : getErrorDetailsFromKey(ErrorCodes.GZB_REGISTRATION_SUCCESS);
};

const isDateValid = (date: string): boolean => {
  const dateObject = new Date(date);
  return dateObject.getTime() > 0;
};

const isThirteenYearsOld = (date: string): IAgeValidation => {
  const dob = new Date(date);
  const dobTimeStamp = dob.getTime();
  const currentTimeStamp = new Date().getTime();
  const age = (currentTimeStamp - dobTimeStamp) / (1000 * 60 * 60 * 24 * 365);
  return { isAbove13: age >= 13, age };
};

export const isEmptyString = (name: string): IResponseDetails => {
  const valid = name.length > 0;
  return valid
    ? getErrorDetailsFromKey(ErrorCodes.GCORN_REGISTRATION_SUCCESS)
    : getErrorDetailsFromKey(ErrorCodes.EMPTY_NAME_FIELD);
};

export const firebaseSuspectedError = (
  errorMessage: string
): IResponseDetails => {
  return {
    code: responseTypes.firebaseGeneratedError.error_code,
    details: errorMessage,
    api_version: responseTypes.firebaseGeneratedError.api_version,
    error: true,
  };
};

export enum FormErrorTypes {
  CUSTOM = 'CUSTOM',
  EMPTY_STRING = 'EMPTY_STRING',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_DATE = 'INVALID_DATE',
  LESS_THAN_13_YEARS = 'LESS_THAN_13_YEARS',
  INVALID_GENDER = 'INVALID_GENDER',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
}

const formValidator = {
  isEmptyString,
  isDateValid,
  isThirteenYearsOld,
  isValidGender,
  isValidEmail,
  isPasswordStrong,
};

export default formValidator;
