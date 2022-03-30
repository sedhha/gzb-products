import {
  IAgeValidation,
  IUserRegistationForm,
} from '@constants/interfaces/gcorn/backend/apis/registerAPI.interfaces';
import { checkIfEmailExists } from './registerWithGZB';
import metadata from './metadata';
import { getErrorDetailsFromKey } from '@global-backend/utils/api/responseSynthesizer';
import {
  ErrorCodes,
  IResponseDetails,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import responseTypes from '@jsons/gzbresponse.json';

export const registerUser = async (
  payload: IUserRegistationForm
): Promise<IResponseDetails> => {
  const { email } = payload;

  //Pre-Validate Details
  const emailExists = await checkIfEmailExists(email);
  //Check if User Exists
  if (emailExists) {
    return getErrorDetailsFromKey(ErrorCodes.EMAIL_EXISTS);
  }

  //Validate Rest of the Data
  return await validateUserDetails(payload);
};

const validateUserDetails = async (
  payload: IUserRegistationForm
): Promise<IResponseDetails> => {
  const { name, dobString, gender } = payload;

  //Check if Provided Name is Empty
  const validName = isEmptyString(name);
  if (validName.error) return validName;

  //Check if the date is valid
  const validDate = isDateValid(dobString);
  if (!validDate) return getErrorDetailsFromKey(ErrorCodes.INVALID_DOB);

  //Check if the person is atleast 13 YO
  const isAboveThirteen = isThirteenYearsOld(dobString);
  if (!isAboveThirteen.isAbove13)
    return getErrorDetailsFromKey(ErrorCodes.BELOW_THIRTEEN);

  //Check if the gender matches with all the available Genders
  const genderValidate = await isValidGender(gender);
  if (genderValidate.error)
    return getErrorDetailsFromKey(ErrorCodes.INVALID_GENDER);

  //Check if the Email is Valid
  const emailValidate = isValidEmail(payload.email);
  if (!emailValidate) return getErrorDetailsFromKey(ErrorCodes.INVALID_EMAIL);

  //Check if the password is strong enough
  const passwordValidate = isPasswordStrong(payload.password);
  if (passwordValidate.error) {
    return passwordValidate;
  }

  return getErrorDetailsFromKey(ErrorCodes.GCORN_REGISTRATION_SUCCESS);
};

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
