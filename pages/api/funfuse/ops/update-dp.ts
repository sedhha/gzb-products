import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { IProfilePicture } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { updateImageLoc } from '@global-backend/funfuse/updateImageLoc';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';

const updateDpHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IProfilePicture;
  const result = await updateImageLoc(payload.userDetails.uid);
  response.status(result.error ? 401 : 200).json(result.data);
};

export default withUserProtect(updateDpHandler);
