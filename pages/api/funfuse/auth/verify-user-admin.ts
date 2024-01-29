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
import { withAdminProtect } from '@firebase-server/middleware/withAdminProtect';

const verifyUserAdminRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const uid = req.body.uid;
  if (!uid)
    return res.status(400).json(
      errorResponse({
        opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_GENERATED_ERROR),
        message: 'Invalid User Verification',
      })
    );
  const claimsData = await Server.auth.getUser(uid);
  if (claimsData != null) {
    await moveToVerifiedUsers(uid);
    await Server.auth.updateUser(uid, {
      ...claimsData.customClaims,
      emailVerified: true,
    });
    return res.status(201).json(
      genericResponse({
        opsDetails: {
          ...getErrorDetailsFromKey(ErrorCodes.FIREBASE_OPERATION_SUCESS),
          details: 'User has been added as verified user.s',
        },
      })
    );
  }

  return res.status(404).json(
    errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_SUSPECTED_ERROR),
    })
  );
};

export default withAdminProtect(verifyUserAdminRoute);
