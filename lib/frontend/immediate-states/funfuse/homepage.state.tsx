export interface IHomeState {
  showAllSkills: boolean;
  showAllInterests: boolean;
  showModal: boolean;
}
export const initState = {
  showAllSkills: false,
  showAllInterests: false,
  showModal: false,
};

export const ACTIONTYPES = {
  SHOW_SKILLS_MODIFY: 'SHOW_SKILLS_MODIFY',
  SHOW_INTERESTS_MODIFY: 'SHOW_INTERESTS_MODIFY',
  MODAL_MODIFY: 'MODAL_MODIFY',
} as const;

type ReducerAction = {
  type: keyof typeof ACTIONTYPES;
  payload: boolean;
};

export const reducer = (
  state: IHomeState,
  action: ReducerAction
): IHomeState => {
  switch (action.type) {
    case ACTIONTYPES.SHOW_SKILLS_MODIFY:
      return { ...state, showAllSkills: action.payload };
    case ACTIONTYPES.SHOW_INTERESTS_MODIFY:
      return { ...state, showAllInterests: action.payload };
    case ACTIONTYPES.MODAL_MODIFY:
      return { ...state, showModal: action.payload };
    default:
      return state;
  }
};
