import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import { IFunFuseInvitePayload } from '@constants/interfaces/funfuse/backend/Dyte.interfaces';
import { IProfilePicture } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { createAMeeting } from '@global-backend/funfuse/addMeeting';

type IncomingRequest = IFunFuseInvitePayload & IProfilePicture;
const discoverUserHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IncomingRequest;
  const { mentor_uid, mentorUrl, creatorUrl, userDetails, mentorName } =
    payload;
  const result = await createAMeeting({
    mentor_uid,
    creator_uid: userDetails.uid ?? '',
    mentorUrl,
    creatorUrl,
    creatorName: userDetails.name ?? 'Guest',
    mentorName,
  });
  return response.status(result.error ? 400 : 201).json(result);
};

export default withUserProtect(discoverUserHandler);
