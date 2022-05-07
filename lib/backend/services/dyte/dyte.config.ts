import {
  IDyteMeetingDetails,
  IDyteMeetingData,
  IFunFuseAddToMeeting,
  IDyteParticipantPayload,
  IDyteAddParticipantResponse,
  IDyteTwoParticipantMeeting,
  IDyteParticipantCred,
  IAllParticipants,
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
                ErrorCodes.VIDEO_SERVER_ACTION_SUCCESS
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
    roleName: 'host',
  };
  const client2Payload: IDyteParticipantPayload = {
    clientSpecificId: clientPayload.mentor_uid,
    userDetails: {
      name: clientPayload.mentorName,
      picture: clientPayload.mentorUrl,
    },
    roleName: 'host',
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

const getDyteMeeting = async (id: string): Promise<IResponse> => {
  return fetch(`${baseUrl}/meetings/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.DYTE_API_KEY ?? '',
    },
  })
    .then((response) =>
      response
        .json()
        .then((data: IDyteAddParticipantResponse) => {
          if (data.success)
            return genericResponse({
              opsDetails: getErrorDetailsFromKey(
                ErrorCodes.VIDEO_SERVER_ACTION_SUCCESS
              ),
              data: data.data,
            });
          else
            return errorHandler(
              data,
              ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR
            );
        })
        .catch((error) =>
          errorHandler(error, ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR)
        )
    )
    .catch((error) =>
      errorHandler(error, ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR)
    );
};

const getAllParticipants = async (id: string): Promise<IResponse> => {
  return fetch(`${baseUrl}/meetings/${id}/participants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.DYTE_API_KEY ?? '',
    },
  })
    .then((response) =>
      response
        .json()
        .then((data: IAllParticipants) => {
          if (!data.success)
            return errorHandler(
              data,
              ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR
            );
          return genericResponse({
            opsDetails: getErrorDetailsFromKey(
              ErrorCodes.VIDEO_SERVER_ACTION_SUCCESS
            ),
            data: data.data.participants.map((element) => element.id),
          });
        })
        .catch((error) =>
          errorHandler(error, ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR)
        )
    )
    .catch((error) =>
      errorHandler(error, ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR)
    );
};

const kickAParticipant = async (
  meetingId: string,
  participantId: string
): Promise<boolean> => {
  return fetch(
    `${baseUrl}/meetings/${meetingId}/participants/${participantId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.DYTE_API_KEY ?? '',
      },
    }
  )
    .then((response) => {
      if (response.status === 404) return true;
      return response
        .json()
        .then((data: { error: boolean; message: string }) => {
          if (data.error) {
            console.log(
              'Error Occured while Deleting Participant = ',
              data.message
            );
            return false;
          }
          return true;
        })
        .catch((error) => {
          console.log(
            'Error occured while kicking participant in JSON Decoding',
            error
          );
          return false;
        });
    })
    .catch((error) => {
      console.log('Error Occured while kicking participant = ', error);
      return false;
    });
};

const kickAllParticipantsByMeetingId = async (
  meetingId: string
): Promise<IResponse> => {
  const meetingParticipants = await getAllParticipants(meetingId);
  if (meetingParticipants.error) return meetingParticipants;
  const ids = meetingParticipants.data as string[];
  console.log('Meeting Id = ', meetingId, ids);
  const promises = ids.map((element) => kickAParticipant(meetingId, element));
  const result = await Promise.all(promises);
  const errorResult = result.find((result) => result === false);
  if (errorResult)
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(
        ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR
      ),
      message: 'Unable to Kick out participants',
    });
  return genericResponse({
    opsDetails: getErrorDetailsFromKey(ErrorCodes.VIDEO_SERVER_ACTION_SUCCESS),
  });
};

const endAMeeting = async (meetingId: string): Promise<boolean> => {
  return fetch(`${baseUrl}/meetings/${meetingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.DYTE_API_KEY ?? '',
    },
    body: JSON.stringify({
      status: 'CLOSED',
    }),
  })
    .then((response) =>
      response
        .json()
        .then((data) => {
          if (data.error) {
            console.log('Error happened while closing meeting = ', data);
            return false;
          }
          return true;
        })
        .catch((error) => {
          console.log('Error occured while ending meeting = ', error);
          return false;
        })
    )
    .catch((error) => {
      console.log('Error Occured while ending meeting = ', error);
      return false;
    });
};

const errorHandler = (
  error: any,
  errorCode: string,
  status_code: number = 400
): IResponse => {
  console.log('Error Occured = ', error);
  return errorResponse({
    status_code,
    opsDetails: getErrorDetailsFromKey(errorCode),
  });
};

const dyteUtils = {
  createDyteMeeting,
  addParticipants,
  addParticipantToMeeting,
  getDyteMeeting,
  getAllParticipants,
  kickAParticipant,
  kickAllParticipantsByMeetingId,
  endAMeeting,
};

export default dyteUtils;
