import { NextApiRequest, NextApiResponse } from 'next';
import { acceptFriendRequest } from '@global-backend/funfuse/addFriend';

const devRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.ALLOW_UNAUTHENTICATED_CALLS === 'true') {
    const data = await acceptFriendRequest(req.body.uid, req.body.requestorUid);
    return res.status(201).json({ data });
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export default devRoute;
