import { IFunFuseMessageBox } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

export interface IConversations {
  selfName: string;
  recieverName: string;
  selfUri: string;
  recieverUri: string;
  selfImgLoaded: boolean;
  recieverImgLoaded: boolean;
  conversations: IFunFuseMessageBox[];
  messagesLoading: boolean;
  message: string;
  messagesPath: string;
}

export type IConversationKeys = 'self' | 'reciever';
export const initState: IConversations = {
  selfName: '',
  recieverName: '',
  selfUri: '/funfuse/avatar.png',
  recieverUri: '/funfuse/avatar.png',
  selfImgLoaded: false,
  recieverImgLoaded: false,
  conversations: [],
  messagesLoading: false,
  message: '',
  messagesPath: '',
};

export const ACTIONTYPES = {
  UPDATE_URI: 'UPDATE_URI',
  UPDATE_CONVERSATIOS: 'UPDATE_CONVERSATIOS',
  SET_LOADING: 'SET_LOADING',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  SET_MESSAGE_PATH: 'SET_MESSAGE_PATH',
} as const;

type ExpectedPayload =
  | string
  | { newUri: string; updateKey: IConversationKeys }
  | IFunFuseMessageBox[]
  | boolean;
type ReducerAction = {
  type: keyof typeof ACTIONTYPES;
  payload?: ExpectedPayload;
};

export const reducer = (
  state: IConversations,
  action: ReducerAction
): IConversations => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_URI: {
      const { newUri, updateKey } = action.payload as {
        newUri: string;
        updateKey: IConversationKeys;
      };
      switch (updateKey) {
        case 'self':
          return { ...state, selfUri: newUri, selfImgLoaded: true };
        case 'reciever':
          return { ...state, recieverUri: newUri, recieverImgLoaded: true };
        default:
          return state;
      }
    }
    case ACTIONTYPES.UPDATE_CONVERSATIOS:
      return {
        ...state,
        conversations: action.payload as IFunFuseMessageBox[],
      };
    case ACTIONTYPES.SET_LOADING:
      return {
        ...state,
        messagesLoading: action.payload as boolean,
      };
    case ACTIONTYPES.UPDATE_MESSAGE:
      return {
        ...state,
        message: action.payload as string,
      };
    case ACTIONTYPES.SET_MESSAGE_PATH:
      return {
        ...state,
        messagesPath: action.payload as string,
      };
    default:
      return state;
  }
};
