import { firebasePaths } from '@constants/firebase/paths';
import {
  ErrorCodes,
  IResponse,
} from '@constants/interfaces/gcorn/backend/apis/response.interfaces';
import Server from '@firebase-server/server.config';
import { mergeCustomClaims } from '@firebase-server/utils/mergeCustomClaims';
import {
  errorResponse,
  genericResponse,
  getErrorDetailsFromKey,
} from '@global-backend/utils/api/responseSynthesizer';
import { FirebaseError } from 'firebase-admin';
export const updateImageLoc = async (
  uid: string
): Promise<{ error: boolean; data: IResponse }> => {
  const storagePath = `${firebasePaths.storage_images}/${uid}/profile-photo`;
  const documentPath = `${firebasePaths.funfuse_users}/${uid}`;
  try {
    const promises = [
      Server.db
        .doc(documentPath)
        .set({ imageLoc: storagePath }, { merge: true }),
      mergeCustomClaims(uid, { imageLoc: storagePath }),
    ];
    await Promise.all(promises);
    return {
      error: false,
      data: genericResponse({
        opsDetails: getErrorDetailsFromKey(
          ErrorCodes.FUNFUSE_PROFILE_UPDATE_SUCESS
        ),
      }),
    };
  } catch (error) {
    const opsDetails = getErrorDetailsFromKey(
      ErrorCodes.FIREBASE_GENERATED_ERROR
    );
    opsDetails.details = (error as FirebaseError).message;
    return { error: true, data: errorResponse({ opsDetails }) };
  }
};
