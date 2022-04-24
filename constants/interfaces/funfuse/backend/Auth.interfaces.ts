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
  gender: string;
  username: string;
  role: FunFuseUserTypes;
  bio?: string;
  skills?: IFunFuseSelectInterface[];
}

export interface IUserState {
  firebaseToken?: string;
  isLoggedIn: boolean;
  isUserVerified?: boolean;
  user?: IFunFuseUserData;
}

export interface IAuthRequest {
  firebaseToken: string;
}
