import { firebaseErrorTranslater } from '@firebase-server/public/errorTranslator';
import { errors } from '@jsons/firebase.json';
describe('Firebase Error Translator', () => {
  it('should translate Error From the Existing List', () => {
    expect(firebaseErrorTranslater('auth/email-already-exists')).toBe(
      errors['auth/email-already-exists']
    );
  });

  it('should translate Error From the Unknwon List to "Unknown Error"', () => {
    expect(firebaseErrorTranslater('some-random-error')).toBe(
      errors['unknown-firebase-error']
    );
  });
});
