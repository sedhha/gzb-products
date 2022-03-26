import metadata from '@firebase-server/public/metadata';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const registerHandler: NextApiHandler = async (
  req: NextApiRequest,
  response: NextApiResponse
) => {
  response.json({ metadata: await metadata });
};

export default registerHandler;
