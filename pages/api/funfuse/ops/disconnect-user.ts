import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { setUserActivity } from '@global-backend/funfuse/loginUser';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { FirebaseError } from 'firebase-admin';
import { IProfilePicture } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';

const disconnectUser: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IProfilePicture;
  try {
    await setUserActivity(
      payload.userDetails.uid,
      false,
      payload.decodedToken.email_verified ?? false
    );
    return response.status(201).json(
      genericResponse({
        opsDetails: getErrorDetailsFromKey(
          ErrorCodes.FIREBASE_OPERATION_SUCESS
        ),
      })
    );
  } catch (error) {
    response.status(401).json(
      errorResponse({
        message: (error as FirebaseError).message,
        opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_GENERATED_ERROR),
      })
    );
  }
};

export default withUserProtect(disconnectUser);
