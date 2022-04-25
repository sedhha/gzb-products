import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import {
  IFunFuseProfileUpdate,
  IProfilePicture,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import { updateFireStoreProfile } from '@global-backend/funfuse/updateProfile';

const updateDpHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IFunFuseProfileUpdate & IProfilePicture;
  const result = await updateFireStoreProfile(payload.userDetails.uid, payload);
  response.status(result.error ? 400 : 201).json(result);
};

export default withUserProtect(updateDpHandler);
