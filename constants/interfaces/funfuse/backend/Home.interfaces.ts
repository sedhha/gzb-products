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

export interface IFunFuseConnectRequest {
  userDetails: IFunFuseUserData;
  decodedToken: IDecodedIdToken;
  recieverUid: string;
}

export interface IFunFuseConnections {
  userDetails: IFunFuseUserData;
  decodedToken: IDecodedIdToken;
}

export interface IFunFuseAcceptFriendRequest {
  userDetails: IFunFuseUserData;
  decodedToken: IDecodedIdToken;
  requestorUid: string;
}
