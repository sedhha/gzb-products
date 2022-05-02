import {
  IFunfuseFrontendUser,
  IFunFuseFbData,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import {
  getConnectedUsers,
  errorHandler,
  convertFbToFrontend,
} from '@global-backend/funfuse/discoverUsers';
import Server from '@firebase-server/server.config';
import { firebasePaths } from '@constants/firebase/paths';

export const getAllConnections = async (
  uid: string
): Promise<IFunfuseFrontendUser[]> => {
  const uids = await getConnectedUsers(uid);
  if (uids.length === 0) return [];
  return Server.db
    .collection(firebasePaths.funfuse_verified_users)
    .where('uid', 'in', uids)
    .get()
    .then((documents) => {
      if (documents.empty) {
        return [] as IFunfuseFrontendUser[];
      }
      const result = documents.docs.map((doc) => {
        const data = doc.data() as IFunFuseFbData;
        return convertFbToFrontend(data);
      });
      return result;
    })
    .catch((error) => {
      errorHandler(error);
      return [] as IFunfuseFrontendUser[];
    });
};
