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
  imageLoc?: string;
}

export interface IUserState {
  firebaseToken?: string;
  isLoggedIn: boolean;
  isUserVerified?: boolean;
  user?: IFunFuseUserData;
  displayPicture?: string;
}

export interface IAuthRequest {
  firebaseToken: string;
}

export interface IProfilePicture {
  userDetails: IFunFuseUserData;
}
