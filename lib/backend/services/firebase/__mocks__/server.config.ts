import { firebasePaths } from '@constants/firebase/paths';
import { IFirebaseMetaData } from '@constants/interfaces/firebase/metadata.interfaces';
import metadataJson from '@gzb-mocks/metadata.json';
import registerJson from '@gzb-mocks/registeration.json';
const doc = (path: string) => {
  switch (path) {
    case firebasePaths.gcorn_constants: {
      return {
        get: () =>
          new Promise((resolve) =>
            resolve({
              exists: true,
              data: () => metadataJson as IFirebaseMetaData,
            })
          ),
      };
    }
    case firebasePaths.gcorn_constants_mock: {
      return {
        get: () =>
          new Promise((resolve) =>
            resolve({
              exists: false,
            })
          ),
      };
    }
    default:
      return jest.fn();
  }
};

const getUserByEmail = (email: string) =>
  new Promise((resolve, reject) => {
    return registerJson.registered_users.includes(email.toLowerCase())
      ? resolve(true)
      : reject(false);
  });
const db = {
  doc,
};

const auth = {
  getUserByEmail,
};
const storage = jest.fn();

const Server = { auth, db, storage };
export default Server;
