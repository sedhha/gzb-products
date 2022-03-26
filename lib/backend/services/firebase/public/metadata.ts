import { firebasePaths } from '@constants/firebase/paths';
import { IFirebaseMetaData } from '@constants/interfaces/firebase/metadata.interfaces';
import Server from '../server.config';

export const getMetadata = (
  mockEmptyCheck: boolean = false
): Promise<IFirebaseMetaData> => {
  return Server.db
    .doc(
      mockEmptyCheck
        ? firebasePaths.gcorn_constants_mock
        : firebasePaths.gcorn_constants
    )
    .get()
    .then((data) => {
      if (!data.exists) {
        return {} as IFirebaseMetaData;
      } else {
        return data.data() as IFirebaseMetaData;
      }
    });
};

const metadata = getMetadata();
export default metadata;
