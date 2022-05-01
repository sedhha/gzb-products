import { NextApiRequest, NextApiResponse } from 'next';
import { discoverUsers } from '@global-backend/funfuse/discoverUsers';

const devRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.ALLOW_UNAUTHENTICATED_CALLS === 'true') {
    const uid = req.body.uid;

    return res.status(200).json({ data: await discoverUsers(uid, 0, 20) });
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export default devRoute;
