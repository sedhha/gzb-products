import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { IFunFuseAcceptFriendRequest } from '@constants/interfaces/funfuse/backend/Home.interfaces';
import { acceptFriendRequest } from '@global-backend/funfuse/addFriend';

const discoverUserHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IFunFuseAcceptFriendRequest;
  const result = await acceptFriendRequest(
    payload.userDetails.uid,
    payload.requestorUid
  );
  return result.error
    ? response.status(400).json(
        errorResponse({
          opsDetails: getErrorDetailsFromKey(
            ErrorCodes.FIREBASE_GENERATED_ERROR
          ),
          message: result.message,
        })
      )
    : response.status(200).json(
        genericResponse({
          opsDetails: getErrorDetailsFromKey(
            ErrorCodes.FUNFUSE_RESOURCE_FETCH_SUCCESS
          ),
        })
      );
};

export default withUserProtect(discoverUserHandler);
