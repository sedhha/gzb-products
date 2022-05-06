import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

export const ACTIONTYPES = {
  SHOW_SKILLS_MODIFY: 'SHOW_SKILLS_MODIFY',
  SHOW_INTERESTS_MODIFY: 'SHOW_INTERESTS_MODIFY',
  MODAL_MODIFY: 'MODAL_MODIFY',
  SET_USERS: 'SET_USERS',
  GO_NEXT: 'GO_NEXT',
  SET_LOADING: 'SET_LOADING',
  TOGGLE_MODE: 'TOGGLE_MODE',
} as const;

export const navModeToIconMap = {
  DISCOVER_MENTORS: 'funfuse-icons-find',
  VIEW_REQUESTS: 'funfuse-icons-list',
};

export type ConnectNavModes = keyof typeof navModes;

export const navModes = {
  DISCOVER_MENTORS: 'DISCOVER_MENTORS',
  VIEW_REQUESTS: 'VIEW_REQUESTS',
} as const;

export interface IHomeFrontendState {
  showAllSkills: boolean;
  showAllInterests: boolean;
  showModal: boolean;
  users: IFunfuseFrontendUser[];
  activeIndex: number;
  isLoading: boolean;
  mode: ConnectNavModes;
}
export const initState: IHomeFrontendState = {
  showAllSkills: false,
  showAllInterests: false,
  showModal: false,
  activeIndex: 0,
  users: [],
  isLoading: false,
  mode: navModes.DISCOVER_MENTORS,
};

type ExpectedPayload = boolean | IFunfuseFrontendUser[] | ConnectNavModes;

type ReducerAction = {
  type: keyof typeof ACTIONTYPES;
  payload?: ExpectedPayload;
};

export const reducer = (
  state: IHomeFrontendState,
  action: ReducerAction
): IHomeFrontendState => {
  switch (action.type) {
    case ACTIONTYPES.SHOW_SKILLS_MODIFY:
      return { ...state, showAllSkills: action.payload as boolean };
    case ACTIONTYPES.SHOW_INTERESTS_MODIFY:
      return { ...state, showAllInterests: action.payload as boolean };
    case ACTIONTYPES.MODAL_MODIFY:
      return { ...state, showModal: action.payload as boolean };
    case ACTIONTYPES.SET_USERS:
      return {
        ...state,
        users: [...(action.payload as IFunfuseFrontendUser[])],
      };
    case ACTIONTYPES.GO_NEXT:
      return {
        ...state,
        activeIndex: state.activeIndex + 1,
        showModal: false,
        showAllInterests: false,
        showAllSkills: false,
      };
    case ACTIONTYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case ACTIONTYPES.TOGGLE_MODE:
      return {
        ...state,
        mode: action.payload as ConnectNavModes,
      };
    default:
      return state;
  }
};
