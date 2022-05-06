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
import { IFunFuseDiscoverUsers } from '@constants/interfaces/funfuse/backend/Home.interfaces';
import { discoverFunFuseMentors } from '@global-backend/funfuse/discoverUsers';

const discoverUserHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IFunFuseDiscoverUsers;
  const users = await discoverFunFuseMentors(
    payload.userDetails.uid,
    payload.startIndex,
    payload.endIndex
  );
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
