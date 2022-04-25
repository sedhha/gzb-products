import Server from '@firebase-server/server.config';
import { FirebaseError } from 'firebase-admin';
export const mergeCustomClaims = async (
  uid: string,
  claims: Record<string, any>
): Promise<{ error: boolean; message?: string }> => {
  try {
    await Server.auth
      .getUser(uid)
      .then(({ customClaims }) =>
        Server.auth.setCustomUserClaims(uid, { ...customClaims, ...claims })
      );
    return { error: false };
  } catch (error) {
    return { error: true, message: (error as FirebaseError).message };
  }
};
