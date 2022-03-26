import { IUserRegistationForm } from '@constants/interfaces/gcorn/backend/apis/registerAPI.interfaces';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { registerUser } from '@firebase-server/public/register';
import {
  errorResponse,
  genericResponse,
} from 'lib/backend/utils/api/responseSynthesizer';

const registerHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse
) => {
  const payload = req.body as IUserRegistationForm;
  const registrationResponse = await registerUser(payload);
  if (registrationResponse.error) {
    return response.status(400).json(errorResponse(registrationResponse));
  }
  return response.status(201).json(genericResponse(registrationResponse));
};

export default registerHandler;
