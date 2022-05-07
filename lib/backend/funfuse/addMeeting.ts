import { firebasePaths, rdb_paths } from '@constants/firebase/paths';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import Server from '@firebase-server/server.config';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import Dyte from '@dyte-server/dyte.config';
import {
  IFunFuseMentorRDBConfig,
  IDyteMeetingData,
  IFunFuseInvitePayload,
  ILiveMeetingDetails,
  IDyteTwoParticipantMeeting,
} from '@constants/interfaces/funfuse/backend/Dyte.interfaces';
import { IFunFuseUserData } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

export const createAMeeting = async (
  props: IFunFuseInvitePayload
): Promise<IResponse> => {
  const {
    mentor_uid,
    creator_uid,
    mentorUrl,
    creatorUrl,
    creatorName,
    mentorName,
  } = props;
  // Check if Mentor is Online and Can take up meeting
  const mentor_ref = Server.db.doc(
    `${firebasePaths.funfuse_verified_users}/${mentor_uid}`
  );
  const mentor_data = await mentor_ref.get();
  if (!mentor_data.exists) {
    return errorResponse({
      status_code: 400,
      opsDetails: getErrorDetailsFromKey(ErrorCodes.INVALID_MENTOR_REQUEST),
    });
  }
  const mentorDetails = mentor_data.data() as IFunFuseUserData;
  if (!mentorDetails.isMentor) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.INVALID_MENTOR_REQUEST),
    });
  }

  if (mentorDetails.activeMentorSession) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.MENTOR_SESSION_IN_PROGRESS),
    });
  }

  if (!(mentorDetails.online ?? false)) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.MENTOR_WENT_OFFLINE),
    });
  }

  const requested_ref = `${rdb_paths.funfuse_meeting_users_requested}/${creator_uid}`;

  const requestedData = await Server.rdb.ref(requested_ref).get();

  if (requestedData.exists()) {
    return errorResponse({
      status_code: 400,
      opsDetails: getErrorDetailsFromKey(
        ErrorCodes.ANOTHER_MEETING_REQUEST_IN_PROCESS
      ),
    });
  }

  const approved_ref = `${rdb_paths.funfuse_meeting_users_live}/${creator_uid}`;
  const approvedData = await Server.rdb.ref(approved_ref).get();

  if (approvedData.exists()) {
    return errorResponse({
      status_code: 400,
      opsDetails: getErrorDetailsFromKey(
        ErrorCodes.USER_APPROVED_ANOTHER_MEETING
      ),
    });
  }

  // Create a Meeting
  const meetingResponse = await Dyte.createDyteMeeting();
  if (meetingResponse.error) {
    return meetingResponse;
  }
  const newUserMeetingData: IFunFuseMentorRDBConfig = {
    inAMeeting: true,
    meetingDetails: meetingResponse.data as IDyteMeetingData,
    mentor_uid,
    creator_uid,
    mentorUrl,
    creatorUrl,
    creatorName,
    mentorName,
  };

  const pending_ref = `${rdb_paths.funfuse_meeting_users_pending}/${mentor_uid}`;
  const dbPromises = [
    Server.rdb.ref(requested_ref).set(newUserMeetingData),
    Server.rdb.ref(pending_ref).push(newUserMeetingData),
  ];
  await Promise.all(dbPromises);
  return genericResponse({
    opsDetails: getErrorDetailsFromKey(ErrorCodes.FUNFUSE_ACTION_SUCCESS),
  });
};

export const startAMeeting = async (
  payload: IFunFuseMentorRDBConfig
): Promise<IResponse> => {
  const {
    creator_uid,
    mentor_uid,
    meetingDetails,
    creatorName,
    mentorName,
    creatorUrl,
    mentorUrl,
  } = payload;
  /*
      1. Check if the Meeting Actually Exists
      2. If not, return 404 meeting Not Found Response
      3. Delete the Request and Pending and update Live Meeting
      4. For Creator, update uid1 with client Details
      5. For Mentor, update uid2 with client Details
      6. Return Success Response
  */

  // 1. Check if the Meeting Actually Exists
  // 2. If not, return 404 meeting Not Found response
  // Check for Creator in Requested Section

  const requestorRef = `${rdb_paths.funfuse_meeting_users_requested}/${creator_uid}`;
  const requestorData = await Server.rdb.ref(requestorRef).get();
  if (!requestorData.exists())
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.MEETING_NOT_FOUND),
    });
  const mentorUid = (requestorData.val() as IFunFuseMentorRDBConfig).mentor_uid;
  if (mentorUid !== mentor_uid)
    return genericResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.MENTOR_WENT_OFFLINE),
    });
  const mentorRef = `${rdb_paths.funfuse_meeting_users_pending}/${mentor_uid}`;
  const mentorData = await Server.rdb.ref(mentorRef).get();
  if (!mentorData.exists()) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.MEETING_NOT_FOUND),
    });
  }

  const creatorUid = (
    Object.values(mentorData.val())?.[0] as IFunFuseMentorRDBConfig
  ).creator_uid;
  if (creatorUid !== creator_uid) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.MEETING_NOT_FOUND),
    });
  }

  // 4. Add Particpants to the Meeting

  const meetingCredentials = await Dyte.addParticipants(
    payload,
    meetingDetails
  );
  if (meetingCredentials.error) return meetingCredentials;

  const liveCreatorMeetingRef = `${rdb_paths.funfuse_meeting_users_live}/${creator_uid}`;
  const liveMentorMeetingRef = `${rdb_paths.funfuse_meeting_users_live}/${mentor_uid}`;

  const liveMeetingCreatorData: ILiveMeetingDetails = {
    clientDetails: (meetingCredentials.data as IDyteTwoParticipantMeeting)
      .creator,
    meetingDetails: meetingDetails,
    uid: creator_uid,
    name: creatorName,
    url: creatorUrl,
    uid2: mentor_uid,
  };

  const liveMeetingMentorData: ILiveMeetingDetails = {
    clientDetails: (meetingCredentials.data as IDyteTwoParticipantMeeting)
      .mentor,
    meetingDetails: meetingDetails,
    uid: mentor_uid,
    name: mentorName,
    url: mentorUrl,
    uid2: creator_uid,
  };

  const dbPromises2 = [
    Server.rdb.ref(liveCreatorMeetingRef).set(liveMeetingCreatorData),
    Server.rdb.ref(liveMentorMeetingRef).set(liveMeetingMentorData),
  ];

  await Promise.all(dbPromises2);
  // 3. Delete the Request and Pending and update Live Meeting
  const dbPromises = [
    Server.rdb.ref(requestorRef).remove(),
    Server.rdb.ref(mentorRef).remove(),
  ];
  await Promise.all(dbPromises);

  //6. Return Success Response

  return genericResponse({
    opsDetails: getErrorDetailsFromKey(ErrorCodes.FUNFUSE_ACTION_SUCCESS),
  });
};

export const endUserMeeting = async (uid: string) => {
  // Check if the Live Meet Exists, if it does, delete the data and also send
  // a dyte request to kick out all participants and update meeting to ended
  const liveMeetingRef = `${rdb_paths.funfuse_meeting_users_live}/${uid}`;
  const liveMeetingData = await Server.rdb.ref(liveMeetingRef).get();
  if (!liveMeetingData.exists()) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.MEETING_NOT_FOUND),
    });
  }
  const liveMeetingDetails = liveMeetingData.val() as ILiveMeetingDetails;
  const meetingDetails = liveMeetingDetails.meetingDetails;
  const uid1 = liveMeetingDetails.uid;
  const uid2 = liveMeetingDetails.uid2;
  const kickResult = await Dyte.kickAllParticipantsByMeetingId(
    meetingDetails.id
  );

  if (kickResult.error) return kickResult;
  const endMeetingResult = await Dyte.endAMeeting(meetingDetails.id);
  if (!endMeetingResult)
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(
        ErrorCodes.INVALID_VIDEO_SERVER_RESPONSE_ERROR
      ),
    });
  const rdbRefs = [uid1, uid2].map((element) => {
    const path = `${rdb_paths.funfuse_meeting_users_live}/${element}`;
    return Server.rdb.ref(path).remove();
  });
  await Promise.all(rdbRefs);
  return genericResponse({
    opsDetails: getErrorDetailsFromKey(ErrorCodes.FUNFUSE_ACTION_SUCCESS),
  });
};
