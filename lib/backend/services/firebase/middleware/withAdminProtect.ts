import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Server from '@firebase-server/server.config';
import {
  errorResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { ErrorCodes } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { getFunFuseUser } from '@global-backend/funfuse/getUser';

export const withAdminProtect = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const firebaseToken = (request.headers['x-access-key'] ?? '') as string;
    const userUID = (request.headers['x-user-id'] ?? '') as string;
    const isAdmin = firebaseToken === process.env.X_ACCESS_KEY;
    if (isAdmin) {
      if (!userUID)
        return response.status(401).json(
          errorResponse({
            access_allowed: false,
            status_code: 401,
            opsDetails: {
              code: '401',
              details: 'Invalid User UID! Must be a valid UID for updates',
              api_version: '1',
              error: true,
            },
          })
        );
      request.body.uid = userUID;
      return handler(request, response);
    } else
      return response.status(401).json(
        errorResponse({
          access_allowed: false,
          status_code: 401,
          opsDetails: {
            code: '401',
            details:
              'Invalid User! Must be an admin before invoking this handler.',
            api_version: '1',
            error: true,
          },
        })
      );
  };
};
