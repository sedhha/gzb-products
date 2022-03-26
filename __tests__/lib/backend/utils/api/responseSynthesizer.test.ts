import {
  errorResponse,
  genericResponse,
} from '@global-backend/utils/api/responseSynthesizer';
import responseMockJson from '@gzb-mocks/response.json';
describe('Response API Formats', () => {
  it('should return Generic Response in case of Generic Function', () => {
    expect(genericResponse({})).toStrictEqual(responseMockJson.success);
  });
  it('should return Error Response in case of Error Function', () => {
    expect(errorResponse({})).toStrictEqual(responseMockJson.error);
  });

  it('should return generic Customized Response when Custom Object is passed', () => {
    expect(
      genericResponse({
        status_code: 201,
        message: 'Success Custom',
        data: { custom: true },
        access_allowed: true,
        session_expired: true,
      })
    ).toStrictEqual(responseMockJson['success-custom']);
  });

  it('should return error Customized Response when Custom Object is passed', () => {
    expect(
      errorResponse({
        status_code: 403,
        message: 'Error Custom',
        data: { custom: true },
        access_allowed: true,
        session_expired: true,
      })
    ).toStrictEqual(responseMockJson['error-custom']);
  });
});
