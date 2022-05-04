import { IFunFuseUserMessages } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

export interface IFunFuseMessagesState {
  loading: boolean;
  messages: IFunFuseUserMessages[];
}
export const initState: IFunFuseMessagesState = {
  loading: false,
  messages: [],
};

export const ACTIONTYPES = {
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  SET_LOADING: 'SET_LOADING',
} as const;

type ExpectedPayload = boolean | IFunFuseUserMessages[];

type ReducerAction = {
  type: keyof typeof ACTIONTYPES;
  payload?: ExpectedPayload;
};

export const reducer = (
  state: IFunFuseMessagesState,
  action: ReducerAction
): IFunFuseMessagesState => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_MESSAGES:
      return {
        ...state,
        messages: action.payload as IFunFuseUserMessages[],
      };
    case ACTIONTYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      };
    default:
      return state;
  }
};
