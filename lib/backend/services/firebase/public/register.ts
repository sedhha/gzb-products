import { IUserRegistationForm } from '@constants/interfaces/gcorn/backend/apis/registerAPI.interfaces';
import { checkIfEmailExists } from './registerWithGZB';
import { getErrorDetailsFromKey } from '@global-backend/utils/api/responseSynthesizer';
import {
  ErrorCodes,
  IResponseDetails,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';

import formValidator from '@global-backend/validators/forms';

const {
  isValidEmail,
  isDateValid,
  isEmptyString,
  isThirteenYearsOld,
  isValidGender,
  isPasswordStrong,
} = formValidator;

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
