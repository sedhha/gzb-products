import { rdb_paths } from '@constants/firebase/paths';
import Server from '@firebase-server/server.config';
import { getRequestedUsers } from '@global-backend/funfuse/discoverUsers';

export const acceptFriendRequest = async (
  uid: string,
  requestorUid: string
): Promise<{ error: boolean; message: string }> => {
  const data = await getRequestedUsers(requestorUid);
  if (!data.includes(uid)) return { error: true, message: 'Invalid request' };

  const allPromises = [
    // Add to Requestor Connections
    Server.rdb
      .ref(`${rdb_paths.funfuse_connected_users}`)
      .child(requestorUid)
      .push(uid),
    // Add to Acceptor Connections
    Server.rdb
      .ref(`${rdb_paths.funfuse_connected_users}`)
      .child(uid)
      .push(requestorUid),
    // Remove from requestor requests
    deleteAnEntryFromRDB(
      `${rdb_paths.funfuse_requested_users}/${requestorUid}`,
      uid
    ),
    // Remove from Acceptor Incoming
    deleteAnEntryFromRDB(
      `${rdb_paths.funfuse_requests_users}/${uid}`,
      requestorUid
    ),
  ];

  await Promise.all(allPromises);
  return { error: false, message: 'Successfully Added to Friends' };
};

const deleteAnEntryFromRDB = (path: string, entry: string) => {
  Server.rdb
    .ref(path)
    .orderByValue()
    .equalTo(entry)
    .get()
    .then((result) => {
      if (result.exists()) {
        const keys = Object.keys(result.val());
        const key = keys[0];
        Server.rdb.ref(path).child(key).remove();
      } else console.log("Doesn't exist", path, entry);
    });
};
