import { IProfilePicture } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import { endUserMeeting } from '@global-backend/funfuse/addMeeting';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const createMentorMeeting: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const {
    userDetails: { uid },
  } = req.body as IProfilePicture;
  const data = await endUserMeeting(uid);
  return res.status(data.error ? 400 : 200).json(data);
};

export default withUserProtect(createMentorMeeting);
