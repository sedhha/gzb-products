import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';

import { IFunFuseAcceptFriendRequest } from '@constants/interfaces/funfuse/backend/Home.interfaces';
import { rejectFriendRequest } from '@global-backend/funfuse/addFriend';

const discoverUserHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IFunFuseAcceptFriendRequest;
  const result = await rejectFriendRequest(
    payload.decodedToken.uid,
    payload.requestorUid
  );
  return response.status(result.error ? 400 : 201).json(result);
};

export default withUserProtect(discoverUserHandler);
