import { firebasePaths } from '@constants/firebase/paths';
import { IFunFuseUserData } from '@constants/interfaces/funfuse';
import {
  IFunFuseFbData,
  IFunfuseFrontendUser,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import Server from '@firebase-server/server.config';
import { FirebaseError } from 'firebase-admin';
import { convertFbToFrontend } from './discoverUsers';

export const getFunFuseUser = async (
  uid: string,
  verified: boolean
): Promise<{ error: boolean; data?: IFunFuseUserData; message?: string }> => {
  try {
    const data = await Server.db
      .doc(
        `${
          verified
            ? firebasePaths.funfuse_verified_users
            : firebasePaths.funfuse_users
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

export const viewFunFuseUser = async (
  uid: string,
  verified: boolean
): Promise<{
  error: boolean;
  data?: IFunfuseFrontendUser;
  message?: string;
}> => {
  try {
    const data = await Server.db
      .doc(
        `${
          verified
            ? firebasePaths.funfuse_verified_users
            : firebasePaths.funfuse_users
        }/${uid}`
      )
      .get();
    if (data.exists) {
      return {
        error: false,
        data: convertFbToFrontend(data.data() as IFunFuseFbData),
      };
    }
    return { error: true, message: 'Non Existent Record' };
  } catch (error) {
    return { error: true, message: (error as FirebaseError).message };
  }
};
