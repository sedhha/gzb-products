import { IUserRegistationForm } from '@constants/interfaces/gcorn/backend/apis/registerAPI.interfaces';
import { registerUser } from '@firebase-server/public/register';
import { getMetadata } from '@firebase-server/public/metadata';
import registerJson from '@gzb-mocks/registeration.json';
import { ErrorCodes } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { getErrorMessageFromKey } from '@global-backend/utils/api/responseSynthesizer';

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
      expect(result.details).toBe(
        getErrorMessageFromKey(ErrorCodes.EMAIL_EXISTS)
      );
    });
  });

  it('should not register Empty Names', async () => {
    registerJson.registration_users.nameEmpty.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.details).toBe(
        getErrorMessageFromKey(ErrorCodes.EMPTY_NAME_FIELD)
      );
    });
  });

  it('should not register Empty Dates', async () => {
    registerJson.registration_users.isDateValid.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.details).toBe(
        getErrorMessageFromKey(ErrorCodes.INVALID_DOB)
      );
    });
  });

  it('should not register Users with less than 13 years of Age', async () => {
    registerJson.registration_users.isThirteenYearOld.forEach(
      async (element) => {
        const result = await registerUser(element as IUserRegistationForm);
        expect(result.error).toBe(true);
        expect(result.details).toBe(
          getErrorMessageFromKey(ErrorCodes.BELOW_THIRTEEN)
        );
      }
    );
  });

  it('should not register Users with Unknown Gender', async () => {
    registerJson.registration_users.isValidGender.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.details).toBe(
        getErrorMessageFromKey(ErrorCodes.INVALID_GENDER)
      );
    });
  });

  it('should not register Users with Invalid Email', async () => {
    registerJson.registration_users.invalidEmail.forEach(async (element) => {
      const result = await registerUser(element as IUserRegistationForm);
      expect(result.error).toBe(true);
      expect(result.details).toBe(
        getErrorMessageFromKey(ErrorCodes.INVALID_EMAIL)
      );
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
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.PASSWORD_LESS_THAN_8_CHARACTERS)
    );
  });

  it('Should not accept any passwords with missing Uppercase letters', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noUpperCase;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.PASSWORD_NOT_HAVING_UPPERCASE)
    );
  });

  it('Should not accept any passwords with missing Lowercase letters', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noLowerCase;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.PASSWORD_NOT_HAVING_LOWERCASE)
    );
  });

  it('Should not accept any passwords with missing Numbers', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noNumbers;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.PASSWORD_NO_NUMBERS)
    );
  });

  it('Should not accept any passwords with missing Special Characters', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.noSpecialCharacters;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.PASSOWRD_MISSING_SPECIAL_CHARACTER)
    );
  });

  it('Should not accept any passwords which contains "<" or ">"', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.arrowChars;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.PASSWORD_HAVING_ARROW_BRACKETS)
    );
  });

  it('Should not accept any passwords which are 16 characters long', async () => {
    content.password =
      registerJson.registration_users.invalidPassword.exceeds16Characters;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(true);
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.PASSWORD_EXCEEDING_16_CHARACTERS)
    );
  });

  it('Should Accept the Form in all other cases', async () => {
    content.password = registerJson.registration_users.invalidPassword.accepted;
    const result = await registerUser(content as IUserRegistationForm);
    expect(result.error).toBe(false);
    expect(result.details).toBe(
      getErrorMessageFromKey(ErrorCodes.GCORN_REGISTRATION_SUCCESS)
    );
  });
});
