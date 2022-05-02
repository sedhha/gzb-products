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
import { IFunFuseConnections } from '@constants/interfaces/funfuse/backend/Home.interfaces';
import { getAllRequests } from '@global-backend/funfuse/getConections';

const discoverUserHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IFunFuseConnections;
  const users = await getAllRequests(payload.userDetails.uid);
  response.status(200).json(
    genericResponse({
      opsDetails: getErrorDetailsFromKey(
        ErrorCodes.FUNFUSE_RESOURCE_FETCH_SUCCESS
      ),
      data: users,
    })
  );
};

export default withUserProtect(discoverUserHandler);
