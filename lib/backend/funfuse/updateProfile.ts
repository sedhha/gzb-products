import { firebasePaths } from '@constants/firebase/paths';
import { IFunFuseProfileUpdate } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
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
import formValidator from '@global-backend/validators/forms';

//TODO: Additional Verification on Skills and Interest to align with specific array

export const updateFireStoreProfile = async (
  uid: string,
  data: IFunFuseProfileUpdate
): Promise<IResponse> => {
  const docPath = `${firebasePaths.funfuse_users}/${uid}`;
  const customError = getErrorDetailsFromKey(
    ErrorCodes.CUSTOM_FORM_FIELD_ERROR
  );
  const keys = ['bio', 'skills', 'interests', 'discoverability'];
  const areKeysValid = formValidator.mustBeDefinedKey(data, keys);
  if (areKeysValid.error) {
    customError.details = `${areKeysValid.key} is not valid`;
    return errorResponse({
      opsDetails: customError,
    });
  }
  const { skills, interests, discoverability } = data;

  if (typeof data.bio !== 'string') {
    customError.details = 'Invalid Bio';
    return errorResponse({
      opsDetails: customError,
    });
  }
  const validSkills =
    Array.isArray(skills) && !skills.some((skill) => typeof skill !== 'string');
  if (!validSkills) {
    customError.details = 'Invalid Selected Skills.';
    return errorResponse({ opsDetails: customError });
  }
  const validInterests =
    Array.isArray(interests) &&
    !interests.some((interest) => typeof interest !== 'string');
  if (!validInterests) {
    customError.details = 'Invalid Selected Interests.';
    return errorResponse({ opsDetails: customError });
  }
  if (typeof discoverability !== 'boolean') {
    customError.details = 'Discoverability can either be true or false.';
    return errorResponse({
      opsDetails: customError,
    });
  }
  await Server.db.doc(docPath).set(
    {
      bio: data.bio,
      skills: data.skills,
      interests: data.interests,
      discoverability: data.discoverability,
    },
    { merge: true }
  );
  return genericResponse({
    opsDetails: getErrorDetailsFromKey(
      ErrorCodes.FUNFUSE_PROFILE_UPDATE_SUCESS
    ),
  });
};
