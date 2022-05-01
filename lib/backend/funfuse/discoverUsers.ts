import { rdb_paths, firebasePaths } from '@constants/firebase/paths';
import {
  IFunFuseFbData,
  IFunfuseFrontendUser,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import Server from '@firebase-server/server.config';
import { FirebaseError } from 'firebase-admin';
import { DataSnapshot } from 'firebase/database';
export const discoverUsers = async (
  uid: string,
  startIndex: number,
  endIndex: number
): Promise<IFunfuseFrontendUser[]> => {
  const notToIncludeAccounts = await prepareDiscoveryUsers(uid);
  if (notToIncludeAccounts.length === 0) return [];
  const bulkRequest = endIndex - startIndex > 20;
  const startAt =
    startIndex !== undefined && endIndex !== undefined && !bulkRequest
      ? startIndex
      : 0;
  const limit =
    startIndex !== undefined && endIndex !== undefined && !bulkRequest
      ? endIndex
      : 20;
  const docRef = Server.db
    .collection(firebasePaths.funfuse_verified_users)
    .where('uid', 'not-in', notToIncludeAccounts)
    .orderBy('uid', 'desc')
    .offset(startAt)
    .limit(limit);

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
      imageLoc: completeData.imageLoc ?? '/funfuse/avatar-02.jpg',
      isImageAvailable: completeData.imageLoc ? true : false,
      uid: completeData.uid,
    };
  });
  return result;
};

const errorHandler = (error: FirebaseError) => {
  console.log(
    'Error Occured While running Discover Users:- ',
    error.code,
    error.message
  );
  return [] as string[];
};

const prepareDiscoveryUsers = async (uid: string) => {
  const allExistingUsers = [
    getConnectedUsers(uid),
    getRequestedUsers(uid),
    getIncomingRequestedUsers(uid),
  ];
  const allUserData = await Promise.all(allExistingUsers);
  const allUsers = allUserData.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, [] as string[]);
  return allUsers;
};

export const getConnectedUsers = async (uid: string): Promise<string[]> => {
  return await Server.rdb
    .ref(`${rdb_paths.funfuse_connected_users}`)
    .child(uid)
    .get() //@ts-ignore
    .then(converSnapShotIntoArray)
    .catch(errorHandler);
};

export const getRequestedUsers = async (uid: string): Promise<string[]> => {
  return await Server.rdb
    .ref(`${rdb_paths.funfuse_requested_users}`)
    .child(uid)
    .get() //@ts-ignore
    .then(converSnapShotIntoArray)
    .catch(errorHandler);
};

export const getIncomingRequestedUsers = async (
  uid: string
): Promise<string[]> => {
  return await Server.rdb
    .ref(`${rdb_paths.funfuse_requests_users}`)
    .child(uid)
    .get() //@ts-ignore
    .then(converSnapShotIntoArray)
    .catch(errorHandler);
};

export const handleOnConnect = async (
  requestorUid: string,
  approverUid: string
): Promise<boolean> => {
  await addToRequestedUsers(requestorUid, approverUid);
  await addToRequestingUser(requestorUid, approverUid);
  return true;
};

const addToRequestedUsers = async (
  requestorUid: string,
  approverUid: string
) => {
  await Server.rdb
    .ref(`${rdb_paths.funfuse_requested_users}`)
    .child(requestorUid)
    .push(approverUid);
};

const addToRequestingUser = async (
  requestorUid: string,
  approverUid: string
) => {
  await Server.rdb
    .ref(`${rdb_paths.funfuse_requests_users}`)
    .child(approverUid)
    .push(requestorUid);
};

export const converSnapShotIntoArray = (snapshot: DataSnapshot): string[] => {
  if (snapshot.exists()) {
    const result = [] as string[];
    snapshot.forEach((element) => {
      result.push(element.val());
    });
    return result;
  }
  return [];
};
