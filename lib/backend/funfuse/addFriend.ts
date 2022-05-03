import { rdb_paths } from '@constants/firebase/paths';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import Server from '@firebase-server/server.config';
import { getRequestedUsers } from '@global-backend/funfuse/discoverUsers';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { FirebaseError } from 'firebase-admin';

export const acceptFriendRequest = async (
  uid: string,
  requestorUid: string
): Promise<IResponse> => {
  const data = await getRequestedUsers(requestorUid);
  if (!data.includes(uid))
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.INVALID_FRIEND_REQUEST),
    });

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

  try {
    await Promise.all(allPromises);
    return genericResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.FUNFUSE_ACTION_SUCCESS),
    });
  } catch (error) {
    return errorResponse({
      opsDetails: getErrorDetailsFromKey(ErrorCodes.FIREBASE_GENERATED_ERROR),
      message: (error as { message: string } | FirebaseError).message,
    });
  }
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
