import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import {
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { viewFunFuseUser } from '@global-backend/funfuse/getUser';

const updateDpHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const { userUid } = req.body as { userUid: string };
  const newPayload = await viewFunFuseUser(userUid, true);
  response.status(newPayload.error ? 400 : 200).json(
    genericResponse({
      opsDetails: getErrorDetailsFromKey(
        ErrorCodes.FUNFUSE_RESOURCE_FETCH_SUCCESS
      ),
      data: newPayload.data ? newPayload.data : {},
    })
  );
};

export default withUserProtect(updateDpHandler);
