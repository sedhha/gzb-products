import {
  IFunFuseUserData,
  IDecodedIdToken,
} from '@constants/interfaces/funfuse';

export interface IFunFuseDiscoverUsers {
  startIndex: number;
  endIndex: number;
  userDetails: IFunFuseUserData; // Coming From Middleware
  decodedToken: IDecodedIdToken; // Coming From Middleware
}
