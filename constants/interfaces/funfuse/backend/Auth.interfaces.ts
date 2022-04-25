export interface IFunFuseRegisterUser {
  name: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  username: string;
}
export type FunFuseUserTypes = 'User' | 'Moderator' | 'Admin';

export interface IFunFuseSelectInterface {
  label: string;
  value: string;
}
export interface IFunFuseUserData {
  name: string;
  email: string;
  dob: string;
  uid: string;
  gender: string;
  username: string;
  role: FunFuseUserTypes;
  discoverability: boolean;
  bio: string;
  skills: IFunFuseSelectInterface[];
  interests: IFunFuseSelectInterface[];
  imageLoc?: string;
}

export interface IErrorNotificationSlice {
  error: boolean;
  message: string;
}

export interface IUserState {
  firebaseToken?: string;
  isLoggedIn: boolean;
  isUserVerified?: boolean;
  user?: IFunFuseUserData;
  displayPicture?: string;
  firestoreUser?: IFunFuseUserData;
  loading: boolean;
  errorNotifications?: IErrorNotificationSlice;
}

export interface IAuthRequest {
  firebaseToken: string;
}

export interface IProfilePicture {
  userDetails: IFunFuseUserData;
}
