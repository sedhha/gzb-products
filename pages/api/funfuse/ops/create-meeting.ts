import { createMeeting } from '@global-backend/funfuse/createMeeting';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const createMentorMeeting: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = await createMeeting();
  console.log('Data = ', data);
  res.status(200).json(data);
};

export default createMentorMeeting;
