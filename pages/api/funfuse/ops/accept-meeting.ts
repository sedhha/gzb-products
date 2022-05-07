import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import { IFunFuseMentorRDBConfig } from '@constants/interfaces/funfuse/backend/Dyte.interfaces';
import { IProfilePicture } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { startAMeeting } from '@global-backend/funfuse/addMeeting';

const discoverUserHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IFunFuseMentorRDBConfig & IProfilePicture;
  const {
    inAMeeting,
    meetingDetails,
    participantDetails,
    creator_uid,
    mentor_uid,
    creatorUrl,
    mentorUrl,
    creatorName,
    mentorName,
  } = payload;
  const createMeetnigPayload = {
    inAMeeting,
    meetingDetails,
    participantDetails,
    creator_uid,
    mentor_uid,
    creatorUrl,
    mentorUrl,
    creatorName,
    mentorName,
  };
  const result = await startAMeeting(createMeetnigPayload);
  return response.status(result.error ? 400 : 201).json(result);
};

export default withUserProtect(discoverUserHandler);
