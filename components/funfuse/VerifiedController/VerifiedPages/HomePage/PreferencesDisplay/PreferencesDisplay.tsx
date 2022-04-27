import React, { useReducer } from 'react';
import ThemeDropDown, {
  OptionType,
} from '@/components/funfuse/ThemeDropDown/ThemeDropDown';
import {
  interestFields,
  skillFields,
} from '@/components/funfuse/VerifiedController/VerifiedPages/Profile/Profile';
import ThemeButton from '@/components/funfuse/Buttons/ThemeButton/ThemeButton';

type Props = {
  closeModal: () => void;
};
const ACTIONTYPES = {
  UPDATE_SKILLS: 'UPDATE_SKILLS',
  UPDATE_INTERESTS: 'UPDATE_INTERESTS',
} as const;

interface IUpdatePrefState {
  skills: OptionType[];
  interests: OptionType[];
}
type ReducerAction = {
  type: keyof typeof ACTIONTYPES;
  payload: OptionType[];
};

const initialPreferenceState: IUpdatePrefState = {
  skills: [] as OptionType[],
  interests: [] as OptionType[],
};

const reducer = (
  state: IUpdatePrefState,
  action: ReducerAction
): IUpdatePrefState => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_SKILLS:
      return { ...state, skills: [...action.payload] };
    case ACTIONTYPES.UPDATE_INTERESTS:
      return { ...state, interests: [...action.payload] };
    default:
      return state;
  }
};
export default function PreferencesDisplay({ closeModal }: Props) {
  const [state, dispatch] = useReducer(reducer, initialPreferenceState);

  return (
    <div className='flex flex-col items-center justify-center w-full p-4 bg-white'>
      <label className='w-full p-0 mt-2 text-sm text-black'>
        Show me People with Following Skills
      </label>
      <ThemeDropDown
        selections={state.skills}
        setSelections={(newSkills) =>
          dispatch({ type: ACTIONTYPES.UPDATE_SKILLS, payload: newSkills })
        }
        options={skillFields}
        className='w-full'
        maxMenuHeight={30}
      />
      <label className='w-full p-0 mt-2 text-sm text-black'>
        Show me People with Following Interests
      </label>
      <ThemeDropDown
        selections={state.interests}
        setSelections={(newInterests) =>
          dispatch({
            type: ACTIONTYPES.UPDATE_INTERESTS,
            payload: newInterests,
          })
        }
        options={interestFields}
        className='w-full'
        maxMenuHeight={30}
      />
      <div className='flex flex-row justify-between w-full gap-1 mt-4'>
        <ThemeButton
          buttonText={'Update Preferences'}
          buttonCallback={() => null}
          twClass='rounded-md'
        />
        <ThemeButton
          buttonText={'Cancel'}
          buttonCallback={closeModal}
          twClass='rounded-md bg-funfuse_red'
        />
      </div>
    </div>
  );
}
