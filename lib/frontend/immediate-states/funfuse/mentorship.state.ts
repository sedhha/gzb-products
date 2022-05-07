import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import {
  IDyteParticipantCred,
  IFunFuseMentorRDBConfig,
  IDyteMeetingData,
} from '@constants/interfaces/funfuse/backend/Dyte.interfaces';

export const ACTIONTYPES = {
  SHOW_SKILLS_MODIFY: 'SHOW_SKILLS_MODIFY',
  SHOW_INTERESTS_MODIFY: 'SHOW_INTERESTS_MODIFY',
  MODAL_MODIFY: 'MODAL_MODIFY',
  SET_USERS: 'SET_USERS',
  GO_NEXT: 'GO_NEXT',
  SET_LOADING: 'SET_LOADING',
  TOGGLE_MODE: 'TOGGLE_MODE',
  UPDATE_REQUESTS: 'UPDATE_REQUESTS',
  UPDATE_IN_CALL: 'UPDATE_IN_CALL',
  UPDATE_IN_CALL_DETAILS: 'UPDATE_IN_CALL_DETAILS',
  UPDATE_ERROR_MESSAGES: 'UPDATE_ERROR_MESSAGES',
  RESET_ERROR_MESSAGES: 'RESET_ERROR_MESSAGES',
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

export type IMentorRequests = Record<string, IFunFuseMentorRDBConfig>;

export interface ILiveMeetingInterface {
  clientDetails: IDyteParticipantCred;
  meetingDetails: IDyteMeetingData;
  name: string;
  url: string;
  uid: string;
}

export interface IHomeFrontendState {
  showAllSkills: boolean;
  showAllInterests: boolean;
  showModal: boolean;
  users: IFunfuseFrontendUser[];
  requests: IMentorRequests;
  activeIndex: number;
  isLoading: boolean;
  mode: ConnectNavModes;
  requestsCount: number;
  inCall: boolean;
  callDetails?: ILiveMeetingInterface;
  errorMessage?: string;
}
export const initState: IHomeFrontendState = {
  showAllSkills: false,
  showAllInterests: false,
  showModal: false,
  activeIndex: 0,
  users: [],
  requests: {},
  isLoading: false,
  mode: navModes.DISCOVER_MENTORS,
  requestsCount: 0,
  inCall: false,
};

type ExpectedPayload =
  | boolean
  | IFunfuseFrontendUser[]
  | ConnectNavModes
  | IMentorRequests
  | ILiveMeetingInterface
  | string;

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
    case ACTIONTYPES.UPDATE_REQUESTS:
      return {
        ...state,
        requests: { ...(action.payload as IMentorRequests) },
        requestsCount: Object.keys(action.payload as IMentorRequests).length,
      };
    case ACTIONTYPES.UPDATE_IN_CALL:
      return {
        ...state,
        inCall: action.payload as boolean,
      };
    case ACTIONTYPES.UPDATE_IN_CALL_DETAILS:
      return {
        ...state,
        callDetails: { ...(action.payload as ILiveMeetingInterface) },
      };
    case ACTIONTYPES.UPDATE_ERROR_MESSAGES:
      return {
        ...state,
        errorMessage: action.payload as string,
      };
    case ACTIONTYPES.RESET_ERROR_MESSAGES:
      return {
        ...state,
        errorMessage: undefined,
      };
    default:
      return state;
  }
};
