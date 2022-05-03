import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

export const navModes = {
  VIEW_CONNECTIONS: 'VIEW_CONNECTIONS',
  VIEW_REQUESTS: 'VIEW_REQUESTS',
} as const;

export const navModeToIconMap = {
  VIEW_CONNECTIONS: { iconName: 'funfuse-icons-list', updates: false },
  VIEW_REQUESTS: { iconName: 'funfuse-icons-find', updates: true },
};

export type ConnectNavModes = keyof typeof navModes;
export interface IConnectsState {
  mode: ConnectNavModes;
  newRequests?: ConnectNavModes;
  loading: boolean;
  error: string;
  connections: IFunfuseFrontendUser[];
  reqUsers: IFunfuseFrontendUser[];
}
export const initState: IConnectsState = {
  mode: navModes.VIEW_CONNECTIONS,
  loading: false,
  connections: [],
  reqUsers: [],
  error: '',
};

export const ACTIONTYPES = {
  TOGGLE_MODE: 'TOGGLE_MODE',
  SET_CONNECTIONS: 'SET_CONNECTIONS',
  SET_REQUESTS: 'SET_REQUESTS',
  SET_LOADING: 'SET_LOADING',
  SET_NEW_REQUESTS: 'SET_NEW_REQUESTS',
  SET_ERROR: 'SET_ERROR',
} as const;

type ExpectedPayload =
  | ConnectNavModes
  | IFunfuseFrontendUser[]
  | boolean
  | string;

type ReducerAction = {
  type: keyof typeof ACTIONTYPES;
  payload?: ExpectedPayload;
};

export const reducer = (
  state: IConnectsState,
  action: ReducerAction
): IConnectsState => {
  switch (action.type) {
    case ACTIONTYPES.TOGGLE_MODE:
      return { ...state, mode: action.payload as keyof typeof navModes };
    case ACTIONTYPES.SET_CONNECTIONS:
      return {
        ...state,
        connections: action.payload as IFunfuseFrontendUser[],
      };
    case ACTIONTYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      };
    case ACTIONTYPES.SET_REQUESTS:
      return {
        ...state,
        reqUsers: action.payload as IFunfuseFrontendUser[],
      };
    case ACTIONTYPES.SET_NEW_REQUESTS:
      return {
        ...state,
        newRequests: action.payload as ConnectNavModes,
      };
    case ACTIONTYPES.SET_ERROR:
      return { ...state, error: action.payload as string };
    default:
      return state;
  }
};
