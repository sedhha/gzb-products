export interface IResponseDetails {
  code: string;
  details: string;
  api_version: string;
  error: boolean;
}

export interface IResponseDetailsMock {
  error_code: string;
  details: string;
  api_version: string;
  error: boolean;
}

export interface IResponseParams {
  status_code: number;
  data: any;
  error: boolean;
  access_allowed: boolean;
  session_expired: boolean;
}
export type IResponse = IResponseParams & { opsDetails: IResponseDetails };

export interface IResponseCook {
  status_code?: number;
  message?: string;
  data?: any;
  access_allowed?: boolean;
  session_expired?: boolean;
  opsDetails: IResponseDetails;
}

export enum ErrorCodes {
  UNKNOWN = 'unknwon',
  EMAIL_EXISTS = 'emailExists',
  GZB_REGISTRATION_SUCCESS = 'gzb_registration_success',
  EMPTY_NAME_FIELD = 'nameEmpty',
  INVALID_DOB = 'invalidDOB',
  BELOW_THIRTEEN = 'belowThirteen',
  INVALID_GENDER = 'invalidGender',
  INVALID_EMAIL = 'invalidEmail',
  PASSWORD_LESS_THAN_8_CHARACTERS = 'passwordLessthan8Char',
  PASSWORD_NOT_HAVING_UPPERCASE = 'passwordNoUpperCase',
  PASSWORD_NOT_HAVING_LOWERCASE = 'passwordNoLowerCase',
  PASSWORD_NO_NUMBERS = 'passwordNoNumbers',
  PASSOWRD_MISSING_SPECIAL_CHARACTER = 'passwordNoSpecialChar',
  PASSWORD_HAVING_ARROW_BRACKETS = 'passwordMissingNoSpecialChar',
  PASSWORD_EXCEEDING_16_CHARACTERS = 'passwordExceeds16Char',
  GCORN_REGISTRATION_SUCCESS = 'gcorn_registration_success',
  FIREBASE_SUSPECTED_ERROR = 'firebaseGeneratedError',
  EMPTY_REQUIRED_FIELD = 'emptyRequiredField',
  USERNAME_ALREADY_EXISTS = 'usernameAlreadyExists',
  USERNAME_TOO_SHORT = 'userNameTooShort',
  FUNFUSE_REGISTRATION_SUCCESS = 'funfuse_registration_success',
  FUNFUSE_LOGIN_SUCCESS = 'funfuse_login_success',
  FUNFUSE_PROFILE_UPDATE_SUCESS = 'funfuseProfileUpdateSuccess',
  FIREBASE_GENERATED_ERROR = 'firebaseGeneratedError',
  INVALID_OR_CORRUPTED_FILE = 'invalidOrCorruptedfileType',
  UEXPECTED_ERROR_WHEN_AUTHENTICATING = 'unexpectedErrorWhenAuthenticating',
  UNAUTHORIZED_USER = 'unauthorizedUser',
  UNKNOWN_KEY = 'unknownKey',
  FUNFUSE_RESOURCE_FETCH_SUCCESS = 'successfullyFetchedFunfuseResource',
  FUNFUSE_ACTION_SUCCESS = 'successfullyCompletedFunfuseOperation',
  CUSTOM_FORM_FIELD_ERROR = 'customFormFieldError',
  FIREBASE_OPERATION_SUCESS = 'firebaseOperationSuccess',
  INVALID_FRIEND_REQUEST = 'invalidFriendRequest',
  INVALID_MENTOR_REQUEST = 'funfuseMeetingUserUnavailable',
  USER_ALREADY_IN_MEETING = 'funfuseUserAlreadyInAMeeting',
  JSON_DECODE_ERROR = 'jsonDecodeError',
  INVALID_SERVER_RESPONSE_ERROR = 'invalidServerResponseError',
  INVALID_VIDEO_SERVER_RESPONSE_ERROR = 'invalidVideoServerResponse',
  ANOTHER_MEETING_REQUEST_IN_PROCESS = 'anotherMeetingRequestInProcess',
  MENTOR_SESSION_IN_PROGRESS = 'mentorSessionInProgress',
  MENTOR_WENT_OFFLINE = 'mentorWentOffline',
  CREATOR_WENT_OFFLINE = 'creatorWentOffline',
  USER_APPROVED_ANOTHER_MEETING = 'userApprovedAnotherRequest',
  MEETING_NOT_FOUND = 'meetingNotFound',
  MEETING_CREATED_SUCCESS = 'meetingCreatedSuccess',
  VIDEO_SERVER_ACTION_SUCCESS = 'videoServerActionSuccess',
}
