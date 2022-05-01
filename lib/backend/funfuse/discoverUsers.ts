import { rdb_paths, firebasePaths } from '@constants/firebase/paths';
import {
  IFunFuseFbData,
  IFunfuseFrontendUser,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import Server from '@firebase-server/server.config';
import { FirebaseError } from 'firebase-admin';
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

const getConnectedUsers = async (uid: string): Promise<string[]> => {
  return await Server.rdb
    .ref(`${rdb_paths.funfuse_connected_users}`)
    .child(uid)
    .get()
    .then((snapshot) => (snapshot.exists() ? snapshot.val() : []) as string[])
    .catch(errorHandler);
};

const getRequestedUsers = async (uid: string): Promise<string[]> => {
  return await Server.rdb
    .ref(`${rdb_paths.funfuse_requested_users}`)
    .child(uid)
    .get()
    .then((snapshot) => (snapshot.exists() ? snapshot.val() : []) as string[])
    .catch(errorHandler);
};

const getIncomingRequestedUsers = async (uid: string): Promise<string[]> => {
  return await Server.rdb
    .ref(`${rdb_paths.funfuse_requests_users}`)
    .child(uid)
    .get()
    .then((snapshot) => (snapshot.exists() ? snapshot.val() : []) as string[])
    .catch(errorHandler);
};
