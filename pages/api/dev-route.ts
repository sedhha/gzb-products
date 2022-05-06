import { NextApiRequest, NextApiResponse } from 'next';
import { discoverFunFuseMentors } from '@global-backend/funfuse/discoverUsers';

const devRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.ALLOW_UNAUTHENTICATED_CALLS === 'true') {
    const data = await discoverFunFuseMentors('1', 0, 20);
    return res.status(201).json({ data });
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export default devRoute;
