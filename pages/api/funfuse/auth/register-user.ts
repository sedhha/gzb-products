import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { registerFunFuseUser } from '@global-backend/funfuse/registerUser';
import { IFunFuseRegisterUser } from '@constants/interfaces/funfuse';
import { IResponse } from '@constants/interfaces/gcorn/backend/apis/response.interfaces';

const registerHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse<IResponse>
) => {
  const payload = req.body as IFunFuseRegisterUser;
  const result = await registerFunFuseUser(payload);
  response.status(result.error ? 400 : 201).json(result);
};

export default registerHandler;
