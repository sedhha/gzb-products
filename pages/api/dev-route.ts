import {
  handleOnConnect,
  getIncomingRequestedUsers,
} from '@global-backend/funfuse/discoverUsers';
import { NextApiRequest, NextApiResponse } from 'next';

const devRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.ALLOW_UNAUTHENTICATED_CALLS === 'true') {
    console.log(
      'Op = ',
      await getIncomingRequestedUsers('I1wZIbz6yAPBGYdovVCZzZetLDI3')
      //   await handleOnConnect(
      //     's01NGdAbyWWwrArOoxRKd9O280U2',
      //     'I1wZIbz6yAPBGYdovVCZzZetLDI3'
      //   )
    );
    return res.status(200).json({ data: 'await discoverUsers(uid, 0, 20)' });
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export default devRoute;
