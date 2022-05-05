import { IFunfuseFrontendUser } from '@constants/interfaces/funfuse/backend/Auth.interfaces';

export interface IHomeFrontendState {
  showAllSkills: boolean;
  showAllInterests: boolean;
  user: IFunfuseFrontendUser;
  isLoading: boolean;
}
export const initState: IHomeFrontendState = {
  showAllSkills: false,
  showAllInterests: false,
  user: {
    name: '',
    online: false,
    bio: '',
    uid: '',
    skills: [],
    interests: [],
    imageLoc: '/funfuse/avatar-02.jpg',
    isImageAvailable: false,
    username: '',
  } as IFunfuseFrontendUser,
  isLoading: true,
};

export const ACTIONTYPES = {
  SHOW_SKILLS_MODIFY: 'SHOW_SKILLS_MODIFY',
  SHOW_INTERESTS_MODIFY: 'SHOW_INTERESTS_MODIFY',
  SET_USER: 'SET_USER',
  SET_LOADING: 'SET_LOADING',
} as const;

type ExpectedPayload = boolean | IFunfuseFrontendUser;

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

    case ACTIONTYPES.SET_USER:
      return {
        ...state,
        user: action.payload as IFunfuseFrontendUser,
      };
    case ACTIONTYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    default:
      return state;
  }
};
