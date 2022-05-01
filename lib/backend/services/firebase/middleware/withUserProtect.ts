import { IProtectedRoute } from '@constants/interfaces/firebase/Auth.interfaces';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Server from '@firebase-server/server.config';
import {
  errorResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { ErrorCodes } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { getFunFuseUser } from '@global-backend/funfuse/getUser';

export const withUserProtect = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const firebaseToken = request.headers.authorization ?? '';
    try {
      const decodedToken = await Server.auth.verifyIdToken(firebaseToken);
      const uid = decodedToken.uid;
      const userRecord = await getFunFuseUser(
        uid,
        decodedToken.email_verified ?? false
      );
      const opsDetails = getErrorDetailsFromKey(
        ErrorCodes.FIREBASE_GENERATED_ERROR
      );
      if (userRecord.error) {
        opsDetails.details =
          userRecord.message ?? 'Completely Unexpected Error';
        return response.status(500).json(
          errorResponse({
            opsDetails,
          })
        );
      }
      try {
        if (userRecord.data) userRecord.data.uid = uid;
        request.body.userDetails = userRecord.data;
        return handler(request, response);
      } catch (e) {
        const opsDetails = getErrorDetailsFromKey(
          ErrorCodes.UEXPECTED_ERROR_WHEN_AUTHENTICATING
        );
        console.log('Error While handling Request = ', e);
        return response.status(500).json(errorResponse({ opsDetails }));
      }
    } catch (e) {
      console.log('Error = ', e);
      return response.status(401).json(
        errorResponse({
          opsDetails: getErrorDetailsFromKey(ErrorCodes.UNAUTHORIZED_USER),
        })
      );
    }
  };
};
