import firebaseJson from '@jsons/firebase.json';

const ErrorMessages = firebaseJson.errors;

export const firebaseErrorTranslater = (errorMessage: string): string => {
  const newErrorMessage = Object.keys(ErrorMessages).find(
    (key) => errorMessage === key
  );
  if (newErrorMessage !== undefined) {
    return ErrorMessages[newErrorMessage as keyof typeof ErrorMessages];
  } else return ErrorMessages['unknown-firebase-error'];
};
