import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { IProfilePicture } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import {
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';

const updateDpHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IProfilePicture;
  response.status(200).json(
    genericResponse({
      opsDetails: getErrorDetailsFromKey(
        ErrorCodes.FUNFUSE_RESOURCE_FETCH_SUCCESS
      ),
      data: payload.userDetails,
    })
  );
};

export default withUserProtect(updateDpHandler);
