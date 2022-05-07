import {
  IDyteMeetingDetails,
  IDyteMeetingData,
  IFunFuseAddToMeeting,
  IDyteParticipantPayload,
  IDyteAddParticipantResponse,
  IDyteTwoParticipantMeeting,
  IDyteParticipantCred,
} from '@constants/interfaces/funfuse/backend/Dyte.interfaces';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';

const baseUrl = `https://api.cluster.dyte.in/v1/organizations/${process.env.DYTE_ORG_ID}`;

const createDyteMeeting = async (): Promise<IResponse> => {
  return fetch(`${baseUrl}/meeting`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.DYTE_API_KEY ?? '',
    },
    body: JSON.stringify({
      title: 'Monday Sprint Planning',
      authorization: {
        waitingRoom: true,
      },
    }),
  })
    .then((response) =>
      response
        .json()
        .then((data: IDyteMeetingDetails) => {
          if (data.success) {
            return genericResponse({
              opsDetails: getErrorDetailsFromKey(
                ErrorCodes.FUNFUSE_ACTION_SUCCESS
              ),
              data: data.data.meeting as IDyteMeetingData,
            });
          }
          return errorHandler(
            response,
            ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR
          );
        })
        .catch((error) => errorHandler(error, ErrorCodes.JSON_DECODE_ERROR))
    )
    .catch((error) =>
      errorHandler(error, ErrorCodes.INVALID_SERVER_RESPONSE_ERROR)
    );
};

const addParticipantToMeeting = async (
  participantPayload: IDyteParticipantPayload,
  meetingDetails: IDyteMeetingData
): Promise<IResponse> => {
  const meetingId = meetingDetails.id;
  return fetch(`${baseUrl}/meetings/${meetingId}/participant`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.DYTE_API_KEY ?? '',
    },
    body: JSON.stringify(participantPayload),
  })
    .then((response) =>
      response
        .json()
        .then((data: IDyteAddParticipantResponse) => {
          if (!data.success) {
            return errorHandler(
              data,
              ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR
            );
          }
          return genericResponse({
            opsDetails: getErrorDetailsFromKey(
              ErrorCodes.MEETING_CREATED_SUCCESS
            ),
            data: data.data,
          });
        })
        .catch((error) =>
          errorHandler(
            error,
            ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR,
            500
          )
        )
    )
    .catch((error) =>
      errorHandler(error, ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR, 500)
    );
};

const addParticipants = async (
  clientPayload: IFunFuseAddToMeeting,
  meetingDetails: IDyteMeetingData
): Promise<IResponse> => {
  const client1Payload: IDyteParticipantPayload = {
    clientSpecificId: clientPayload.creator_uid,
    userDetails: {
      name: clientPayload.creatorName,
      picture: clientPayload.creatorUrl,
    },
    roleName: 'participant',
  };
  const client2Payload: IDyteParticipantPayload = {
    clientSpecificId: clientPayload.mentor_uid,
    userDetails: {
      name: clientPayload.mentorName,
      picture: clientPayload.mentorUrl,
    },
    roleName: 'participant',
  };

  const promises = [
    addParticipantToMeeting(client1Payload, meetingDetails),
    addParticipantToMeeting(client2Payload, meetingDetails),
  ];
  const response = await Promise.all(promises);
  const errorResult = response.find((result) => result.error);
  if (errorResult) return errorResult;
  return genericResponse({
    opsDetails: getErrorDetailsFromKey(ErrorCodes.MEETING_CREATED_SUCCESS),
    data: {
      creator: (response?.[0].data as IDyteParticipantCred) ?? {},
      mentor: (response?.[1].data as IDyteParticipantCred) ?? {},
    } as IDyteTwoParticipantMeeting,
  });
};

const errorHandler = (
  error: any,
  errorCode: string,
  status_code: number = 400
) => {
  console.log('Error Occured = ', error);
  return errorResponse({
    status_code,
    opsDetails: getErrorDetailsFromKey(errorCode),
  });
};

const dyteUtils = {
  createDyteMeeting,
  addParticipants,
};

export default dyteUtils;
