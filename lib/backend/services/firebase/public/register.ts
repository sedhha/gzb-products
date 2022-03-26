import {
  IAgeValidation,
  IUserRegistationForm,
  IValidRegistration,
} from '@constants/interfaces/gcorn/backend/apis/registerAPI.interfaces';
import Server from '../server.config';
import metadata from './metadata';

export const errorMessages = {
  emailExists: 'User Already Exists',
  nameEmpty: 'Name field must not be empty',
  invalidDOB: 'Date of Birth is not valid',
  belowThirteen: 'You must be atleast 13 years old',
  invalidGender: 'Invalid Gender!',
  invalidEmail: 'Invalid Email Entered',
  passwordLessthan8Char: 'Password must be atleast 8 characters long',
  passwordNoUpperCase: 'Password must have atleast one uppercase letter',
  passwordNoLowerCase: 'Password must have atleast one lowercase letter',
  passwordNoNumbers: 'Password must have atleast one number',
  passwordNoSpecialChar:
    'Password must contain one of the following characters: ! @ # ? ]',
  passwordMissingNoSpecialChar: 'Password must not contain < or >',
  passwordExceeds16Char: 'Password must not contain more than 16 characters',
  success: 'User Created Successfully',
};

export const registerUser = async (
  payload: IUserRegistationForm
): Promise<IValidRegistration> => {
  const { email } = payload;

  //Pre-Validate Details
  const emailExists = await checkIfEmailExists(email);
  //Check if User Exists
  if (emailExists) {
    return { error: true, message: errorMessages.emailExists };
  }

  //Validate Rest of the Data
  const { error, message } = await validateUserDetails(payload);

  if (error) {
    return { error, message };
  }

  //Create User
  return { error: false, message: errorMessages.success };
};

export const checkIfEmailExists = (email: string): Promise<boolean> => {
  return Server.auth
    .getUserByEmail(email)
    .then(() => true)
    .catch(() => false);
};

const validateUserDetails = async (
  payload: IUserRegistationForm
): Promise<IValidRegistration> => {
  const { name, dobString, gender } = payload;

  //Check if Provided Name is Empty
  if (name.length <= 0) {
    return { error: true, message: errorMessages.nameEmpty };
  }

  //Check if the date is valid
  const validDate = isDateValid(dobString);
  if (!validDate) {
    return { error: true, message: errorMessages.invalidDOB };
  }

  //Check if the person is atleast 13 YO
  const isAboveThirteen = isThirteenYearsOld(dobString);
  if (!isAboveThirteen.isAbove13) {
    return { error: true, message: errorMessages.belowThirteen };
  }

  //Check if the gender matches with all the available Genders
  const genderValidate = await isValidGender(gender);
  if (!genderValidate)
    return { error: true, message: errorMessages.invalidGender };

  //Check if the Email is Valid
  const emailValidate = isValidEmail(payload.email);
  if (!emailValidate) {
    return { error: true, message: errorMessages.invalidEmail };
  }

  //Check if the password is strong enough
  const passwordValidate = isPasswordStrong(payload.password);
  if (passwordValidate.error) {
    return passwordValidate;
  }

  return { error: false, message: errorMessages.success };
};

const isPasswordStrong = (
  password: string
): { error: boolean; message: string } => {
  //Atleast 8 characters
  if (password.length < 8) {
    return {
      error: true,
      message: errorMessages.passwordLessthan8Char,
    };
  }
  //Must have atleast one uppercase Letter
  if (!password.match(/[A-Z]/)) {
    return {
      error: true,
      message: errorMessages.passwordNoUpperCase,
    };
  }
  //Must have at least one lowercase Letter
  if (!password.match(/[a-z]/)) {
    return {
      error: true,
      message: errorMessages.passwordNoLowerCase,
    };
  }
  //Must have at least one number
  if (!password.match(/[0-9]/)) {
    return {
      error: true,
      message: errorMessages.passwordNoNumbers,
    };
  }
  //Must contain one of the following characters: ! @ # ? ]
  if (!password.match(/[!@#$?]/)) {
    return {
      error: true,
      message: errorMessages.passwordNoSpecialChar,
    };
  }
  //Must not contain < or >
  if (password.match(/[<>]/)) {
    return {
      error: true,
      message: errorMessages.passwordMissingNoSpecialChar,
    };
  }

  //Must be less than 16 characters long
  if (password.length > 16) {
    return {
      error: true,
      message: errorMessages.passwordExceeds16Char,
    };
  }

  return { error: false, message: errorMessages.success };
};

const isValidEmail = (email: string) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

const isValidGender = async (gender: string): Promise<boolean> => {
  return (await metadata).gender.includes(gender);
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
