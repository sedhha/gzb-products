export interface IConversations {
  selfName: string;
  recieverName: string;
  selfUri: string;
  recieverUri: string;
  selfImgLoaded: boolean;
  recieverImgLoaded: boolean;
}

export type IConversationKeys = 'self' | 'reciever';
export const initState: IConversations = {
  selfName: '',
  recieverName: '',
  selfUri: '/funfuse/avatar.png',
  recieverUri: '/funfuse/avatar.png',
  selfImgLoaded: false,
  recieverImgLoaded: false,
};

export const ACTIONTYPES = {
  UPDATE_URI: 'UPDATE_URI',
} as const;

type ExpectedPayload =
  | string
  | { newUri: string; updateKey: IConversationKeys };
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
    default:
      return state;
  }
};
