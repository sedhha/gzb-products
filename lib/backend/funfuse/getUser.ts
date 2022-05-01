import { firebasePaths } from '@constants/firebase/paths';
import { IFunFuseUserData } from '@constants/interfaces/funfuse';
import Server from '@firebase-server/server.config';
import { FirebaseError } from 'firebase-admin';

export const getFunFuseUser = async (
  uid: string,
  verified: boolean
): Promise<{ error: boolean; data?: IFunFuseUserData; message?: string }> => {
  try {
    const data = await Server.db
      .doc(
        `${
          verified ? firebasePaths.verified_users : firebasePaths.funfuse_users
        }/${uid}`
      )
      .get();
    if (data.exists) {
      return { error: false, data: data.data() as IFunFuseUserData };
    }
    return { error: true, message: 'Non Existent Record' };
  } catch (error) {
    return { error: true, message: (error as FirebaseError).message };
  }
};
