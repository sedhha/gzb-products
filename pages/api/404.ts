import { NextApiRequest, NextApiResponse } from 'next';

const notFound = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).json({ message: 'Not Found', error: 'True' });
};

export default notFound;
