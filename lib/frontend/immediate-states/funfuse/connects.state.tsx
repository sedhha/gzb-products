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
  newRequests: boolean;
  loading: boolean;
  connections: IFunfuseFrontendUser[];
  reqUsers: IFunfuseFrontendUser[];
}
export const initState: IConnectsState = {
  mode: navModes.VIEW_CONNECTIONS,
  newRequests: false,
  loading: false,
  connections: [],
  reqUsers: [],
};

export const ACTIONTYPES = {
  TOGGLE_MODE: 'TOGGLE_MODE',
  SET_CONNECTIONS: 'SET_CONNECTIONS',
  SET_LOADING: 'SET_LOADING',
} as const;

type ExpectedPayload = ConnectNavModes | IFunfuseFrontendUser[] | boolean;

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
    default:
      return state;
  }
};
