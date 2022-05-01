import { ErrorCodes } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
  getErrorMessageFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import responseMockJson from '@gzb-mocks/response.json';
import gzbResponses from '@constants/json/gzbresponse.json';

const opsDetails = {
  error: true,
  code: 'UNEXPECTED_OPERATION_FROM_SERVER',
  details: 'No description available for this operation.',
  api_version: 'v1',
};
describe('Response API Formats', () => {
  it('should return Generic Response in case of Generic Function', () => {
    expect(
      genericResponse({
        opsDetails,
      })
    ).toStrictEqual(responseMockJson.success);
  });
  it('should return Error Response in case of Error Function', () => {
    expect(
      errorResponse({
        opsDetails,
      })
    ).toStrictEqual(responseMockJson.error);
  });

  it('should return generic Customized Response when Custom Object is passed', () => {
    expect(
      genericResponse({
        status_code: 201,
        message: 'Success Custom',
        data: { custom: true },
        access_allowed: true,
        session_expired: true,
        opsDetails,
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
        opsDetails,
      })
    ).toStrictEqual(responseMockJson['error-custom']);
  });

  it('should return Unknown Response when No OpsDetails is passed in "genericResponse" function', () => {
    const gR = genericResponse(
      //@ts-ignore
      {
        status_code: 201,
        message: 'Generic Custom',
        data: { custom: true },
        access_allowed: true,
        session_expired: true,
      }
    );
    expect(gR.opsDetails).toStrictEqual({
      api_version: gzbResponses.unknwon.api_version,
      code: gzbResponses.unknwon.code,
      details: 'Generic Custom',
      error: gzbResponses.unknwon.error,
    });
  });
  it('should return error Unknown Response when No OpsDetails is passed in "errorResponse" function', () => {
    const eR = errorResponse(
      //@ts-ignore
      {
        status_code: 403,
        message: 'Error Custom',
        data: { custom: true },
        access_allowed: true,
        session_expired: true,
      }
    );
    expect(eR.opsDetails).toStrictEqual({
      api_version: gzbResponses.unknwon.api_version,
      code: gzbResponses.unknwon.code,
      details: 'Error Custom',
      error: gzbResponses.unknwon.error,
    });
  });
});

describe('Error Details And Messages inside Repsonse Synthesizer', () => {
  it('should return error Details when passed Error Key', () => {
    expect(getErrorDetailsFromKey(ErrorCodes.BELOW_THIRTEEN)).toStrictEqual({
      details: gzbResponses.belowThirteen.details,
      code: gzbResponses.belowThirteen.error_code,
      api_version: gzbResponses.belowThirteen.api_version,
      error: gzbResponses.belowThirteen.error,
    });
  });

  it('should return unknown Error Details when passed Unknown Key', () => {
    expect(getErrorDetailsFromKey(ErrorCodes.UNKNOWN_KEY)).toStrictEqual({
      details: gzbResponses.unknwon.details,
      code: gzbResponses.unknwon.error_code,
      api_version: gzbResponses.unknwon.api_version,
      error: gzbResponses.unknwon.error,
    });
  });

  it('should return error Message when passed Error Key', () => {
    expect(getErrorMessageFromKey(ErrorCodes.BELOW_THIRTEEN)).toBe(
      gzbResponses.belowThirteen.details
    );
  });

  it('should return unknown error Message when passed unknown Error Key', () => {
    expect(getErrorMessageFromKey(ErrorCodes.UNKNOWN_KEY)).toBe(
      gzbResponses.unknwon.details
    );
  });
});
