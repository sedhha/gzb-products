import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { loginUser } from '@global-backend/funfuse/loginUser';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import { IAuthRequest } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

const registerHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IAuthRequest;
  const result = await loginUser(payload.firebaseToken);
  response.status(result.error ? 401 : 200).json(result);
};

export default registerHandler;
