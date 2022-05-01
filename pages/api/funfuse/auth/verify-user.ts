import { moveToVerifiedUsers } from '@global-backend/funfuse/loginUser';
import { NextApiRequest, NextApiResponse } from 'next';
import Server from '@firebase-server/server.config';
import { withUserProtect } from '@firebase-server/middleware/withUserProtect';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { ErrorCodes } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';

const verifyUserRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const uid = req.body.uid;
  if (!uid)
    return res.status(400).json(
      errorResponse({
        opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_GENERATED_ERROR),
        message: 'Invalid User Verification',
      })
    );
  const claimsData = await Server.auth.getUser(uid);
  const emailVerified = claimsData.emailVerified;
  if (emailVerified) {
    await moveToVerifiedUsers(uid);
    return res.status(201).json(
      genericResponse({
        opsDetails: getErrorDetailsFromKey(
          ErrorCodes.FIREBASE_OPERATION_SUCESS
        ),
      })
    );
  }

  return res.status(404).json(
    errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_SUSPECTED_ERROR),
    })
  );
};

export default verifyUserRoute;
