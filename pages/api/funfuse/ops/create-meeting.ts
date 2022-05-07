import { createMeeting } from '@global-backend/funfuse/createMeeting';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const createMentorMeeting: NextApiHandler = async (
  _: NextApiRequest,
  res: NextApiResponse
) => {
  if (process.env.NODE_ENV !== 'development')
    return res.status(404).json({ message: 'Not Found' });
  const data = await createMeeting();
  res.status(200).json(data);
};

export default createMentorMeeting;
