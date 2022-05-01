import {
  moveToVerifiedUsers,
  moveToUnVerifiedUsers,
} from '@global-backend/funfuse/loginUser';
import { NextApiRequest, NextApiResponse } from 'next';
import Server from '@firebase-server/server.config';

const devRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.ALLOW_UNAUTHENTICATED_CALLS === 'true') {
    const uid = req.body.uid;
    await moveToVerifiedUsers(uid);
    const claimsData = await Server.auth.getUser(uid);
    const emailVerified = claimsData.emailVerified;
    if (emailVerified) {
      await moveToVerifiedUsers(uid);
      return res.status(200).json({ message: 'Successfully authenticated' });
    } else {
      await moveToUnVerifiedUsers(uid);
      console.log('Moved to unverified');
      return res
        .status(404)
        .json({ message: 'Moving to Unverified', error: 'True' });
    }
  }
  return res.status(404).json({ message: 'Not Found', error: 'True' });
};

export default devRoute;
