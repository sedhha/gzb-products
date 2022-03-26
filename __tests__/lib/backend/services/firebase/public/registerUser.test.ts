import { IUserRegistationForm } from '@constants/interfaces/gcorn/backend/apis/registerAPI.interfaces';
import {
  checkIfEmailExists,
  errorMessages,
  registerUser,
} from '@firebase-server/public/register';
import { getMetadata } from '@firebase-server/public/metadata';
import registerJson from '@gzb-mocks/registeration.json';

jest.mock('@firebase-server/server.config');

describe('Registration Form Testing', () => {
  it('should return Empty Object if the metadata path is wrong/unavailable', async () => {
    const metadata = await getMetadata(true);
    expect(metadata).toStrictEqual({});
  });

  it('should not register Duplicate Users', async () => {
    registerJson.registration_users.emailExists.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.message).toBe(errorMessages.emailExists);
    });
  });

  it('should not register Empty Names', async () => {
    registerJson.registration_users.nameEmpty.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.message).toBe(errorMessages.nameEmpty);
    });
  });

  it('should not register Empty Dates', async () => {
    registerJson.registration_users.isDateValid.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.message).toBe(errorMessages.invalidDOB);
    });
  });

  it('should not register Users with less than 13 years of Age', async () => {
    registerJson.registration_users.isThirteenYearOld.forEach(
      async (element) => {
        const result = await registerUser(element as IUserRegistationForm);
        expect(result.error).toBe(true);
        expect(result.message).toBe(errorMessages.belowThirteen);
      }
    );
  });

  it('should not register Users with Unknown Gender', async () => {
    registerJson.registration_users.isValidGender.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.message).toBe(errorMessages.invalidGender);
    });
  });

  it('should not register Users with Invalid Email', async () => {
    registerJson.registration_users.invalidEmail.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.message).toBe(errorMessages.invalidEmail);
    });
  });
});

describe('Registration Password Testing', () => {
  const content = {
    ...registerJson.registration_users.invalidPassword.content,
  };

  it('Should not accept any passwords less than 8 characters long', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.lessThan8Characters;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.message).toBe(errorMessages.passwordLessthan8Char);
  });

  it('Should not accept any passwords with missing Uppercase letters', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noUpperCase;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.message).toBe(errorMessages.passwordNoUpperCase);
  });

  it('Should not accept any passwords with missing Lowercase letters', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noLowerCase;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.message).toBe(errorMessages.passwordNoLowerCase);
  });

  it('Should not accept any passwords with missing Numbers', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noNumbers;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.message).toBe(errorMessages.passwordNoNumbers);
  });

  it('Should not accept any passwords with missing Special Characters', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noSpecialCharacters;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.message).toBe(errorMessages.passwordNoSpecialChar);
  });

  it('Should not accept any passwords which contains "<" or ">"', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.arrowChars;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.message).toBe(errorMessages.passwordMissingNoSpecialChar);
  });

  it('Should not accept any passwords which are 16 characters long', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.exceeds16Characters;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.message).toBe(errorMessages.passwordExceeds16Char);
  });

  it('Should Accept the Form in all other cases', async () => {
    content.password = registerJson.registration_users.invalidPassword.accepted;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(false);
    expect(result.message).toBe(errorMessages.success);
  });
});
