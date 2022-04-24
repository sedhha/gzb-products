export interface IFirebaseUserMinimal {
  email: string;
  password: string;
  displayName: string;
  gender: string;
  errorTest?: boolean;
}
export interface IFirebaseUserRest {
  emailVerified: boolean;
  phoneNumber: string;
  photoURL: string;
  disabled: boolean;
}

export interface IFirebaseCreation {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
  disabled: boolean;
  emailVerified: boolean;
}

export interface IFirebaseError {
  message: string;
  error: boolean;
}
export type IFirebaseUser = IFirebaseUserMinimal & IFirebaseUserRest;

export interface IProtectedRoute {
  firebaseToken: string;
}
