import { firebasePaths } from '@constants/firebase/paths';
import {
  IFunfuseDiscoverUserData,
  IFunFuseFbData,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import Server from '@firebase-server/server.config';
export const discoverUsers = async (
  startIndex: number,
  endIndex: number
): Promise<IFunfuseDiscoverUserData[]> => {
  const docRef = Server.db
    .collection(firebasePaths.funfuse_users)
    .startAfter(startIndex)
    .limit(endIndex);

  const data = await docRef.get();

  if (data.empty) {
    return [];
  }
  const result = data.docs.map((doc) => {
    const completeData = doc.data() as IFunFuseFbData;
    return {
      name: completeData.name,
      online: completeData.online ?? false,
      bio: completeData.bio,
      skills: completeData.skills,
      interests: completeData.interests,
    };
  });
  return result;
};
