import {
  IResponseDetails,
  IResponseDetailsMock,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { registerWithGZB } from '@firebase-server/public/registerWithGZB';
import {
  errorResponse,
  genericResponse,
} from '@global-backend/utils/api/responseSynthesizer';
import {
  emailExists,
  passwordWeak,
  emptyDisplayName,
  invalidGender,
  firebaseError,
  successfulRegistration,
  successfulRegistrationWithFemale,
} from '@gzb-mocks/gzbUsers.json';
import responses from '@jsons/gzbresponse.json';
import firebaseJson from '@jsons/firebase.json';
jest.mock('@firebase-server/server.config');

const buildDetailsFromOPS = (
  response: IResponseDetailsMock
): IResponseDetails => {
  return {
    error: response.error,
    code: response.error_code,
    details: response.details,
    api_version: response.api_version,
  };
};

describe('Register With GZB', () => {
  // Email Exists
  // Password Weak
  // Empty Display Name
  // Invalid Gender
  // Throwing Firebase Error
  // Successful Registration
  it('should not register a New User when Email exists', async () => {
    expect(await registerWithGZB(emailExists)).toStrictEqual(
      errorResponse({
        opsDetails: buildDetailsFromOPS(responses.emailExists),
      })
    );
  });

  it('should not register a New User when Password is Weak', async () => {
    expect(await registerWithGZB(passwordWeak)).toStrictEqual(
      errorResponse({
        opsDetails: buildDetailsFromOPS(responses.passwordLessthan8Char),
      })
    );
  });

  it('should not register a New User when Display Name is Empty', async () => {
    expect(await registerWithGZB(emptyDisplayName)).toStrictEqual(
      errorResponse({
        opsDetails: buildDetailsFromOPS(responses.nameEmpty),
      })
    );
  });

  it('should not register a New User when Gender is Invalid', async () => {
    expect(await registerWithGZB(invalidGender)).toStrictEqual(
      errorResponse({
        opsDetails: buildDetailsFromOPS(responses.invalidGender),
      })
    );
  });

  it('should throw Firebase Error when Firebase Error Occurs', async () => {
    const fE = buildDetailsFromOPS(responses.firebaseGeneratedError);
    fE.details = firebaseJson.errors['auth/user-not-found'];
    expect(await registerWithGZB(firebaseError)).toStrictEqual(
      errorResponse({
        opsDetails: fE,
      })
    );
  });

  it('should register a New User when Registration is Successful', async () => {
    expect(await registerWithGZB(successfulRegistration)).toStrictEqual(
      genericResponse({
        opsDetails: buildDetailsFromOPS(responses.gzb_registration_success),
      })
    );
  });
  it('should register a New Female User when Registration is Successful', async () => {
    const logSpy = jest.spyOn(console, 'log');
    const result = await registerWithGZB(successfulRegistrationWithFemale);
    expect(result).toStrictEqual(
      genericResponse({
        opsDetails: buildDetailsFromOPS(responses.gzb_registration_success),
      })
    );
    expect(logSpy).toHaveBeenCalledWith('triggered');
    logSpy.mockReset();
  });
});
