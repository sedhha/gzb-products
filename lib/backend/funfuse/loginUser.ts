import { firebasePaths } from '@constants/firebase/paths';
import {
  IUserState,
  IFunFuseUserData,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import Server from '@firebase-server/server.config';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { FirebaseError } from 'firebase-admin';

export const loginUser = async (idToken: string): Promise<IResponse> => {
  try {
    const decodedToken = await Server.auth.verifyIdToken(idToken);
    await setUserActivity(decodedToken.uid, true);
    const payload: IUserState = {
      isLoggedIn: true,
      firebaseToken: idToken,
      user: decodedToken as unknown as IFunFuseUserData,
      loading: false,
    };
    const opsDetails = getErrorDetailsFromKey(ErrorCodes.FUNFUSE_LOGIN_SUCCESS);
    return genericResponse({
      opsDetails,
      data: payload,
      message: opsDetails.details,
    });
  } catch (e) {
    return errorResponse({
      data: { isLoggedIn: false },
      opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_SUSPECTED_ERROR),
      message: (e as FirebaseError).message,
    });
  }
};

export const setUserActivity = async (uid: string, status: boolean) => {
  const userDoc = Server.db.doc(`${firebasePaths.funfuse_users}/${uid}`);
  await userDoc.set(
    { online: status, lastLoggedIn: new Date().getTime() },
    { merge: true }
  );
};

export const moveToVerifiedUsers = async (uid: string): Promise<boolean> => {
  const recordRef = Server.db.doc(`${firebasePaths.funfuse_users}/${uid}`);
  const record = await recordRef.get();
  if (record.exists) {
    const data = record.data() as IFunFuseUserData;
    const newLocation = Server.db.doc(`${firebasePaths.verified_users}/${uid}`);
    await newLocation.set(data, { merge: true });
    await recordRef.delete();
    return true;
  }
  return false;
};

export const moveToUnVerifiedUsers = async (uid: string): Promise<boolean> => {
  const recordRef = Server.db.doc(`${firebasePaths.verified_users}/${uid}`);
  const record = await recordRef.get();
  if (record.exists) {
    const data = record.data() as IFunFuseUserData;
    const newLocation = Server.db.doc(`${firebasePaths.funfuse_users}/${uid}`);
    await newLocation.set(data, { merge: true });
    await recordRef.delete();
    return true;
  }
  return false;
};
