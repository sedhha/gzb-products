export interface IFunFuseRegisterUser {
  name: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
  username: string;
}
export type FunFuseUserTypes = 'User' | 'Moderator' | 'Admin';

export interface IFunFuseUserData {
  name: string;
  email: string;
  dob: string;
  gender: string;
  username: string;
  role: FunFuseUserTypes;
}
