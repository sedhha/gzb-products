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
  online?: boolean;
}

export interface IFunFuseFbData {
  name: string;
  email: string;
  dob: string;
  uid: string;
  gender: string;
  username: string;
  role: FunFuseUserTypes;
  discoverability: boolean;
  bio: string;
  skills: string[];
  interests: string[];
  imageLoc?: string;
  online?: boolean;
}

export interface IFunfuseDiscoverUserData {
  name: string;
  online: boolean;
  bio: string;
  skills: string[];
  interests: string[];
}

export interface IFunFuseProfileUpdate {
  bio: string;
  skills: string[];
  interests: string[];
  discoverability: boolean;
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
