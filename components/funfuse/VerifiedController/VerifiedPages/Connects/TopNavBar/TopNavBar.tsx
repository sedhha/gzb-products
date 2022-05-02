import {
  ConnectNavModes,
  navModeToIconMap,
} from '@immediate-states/funfuse/connects.state';
import React from 'react';

type Props = {
  onModeChange: (mode: ConnectNavModes) => void;
  currentMode: ConnectNavModes;
};

export default function TopNavBar({ onModeChange, currentMode }: Props) {
  return (
    <div className='flex items-center justify-around w-full p-1 mt-1'>
      {Object.keys(navModeToIconMap).map((navClass) => {
        const value =
          navModeToIconMap[navClass as keyof typeof navModeToIconMap];

        return (
          <div className='relative' key={navClass}>
            <div
              onClick={() => onModeChange(navClass as ConnectNavModes)}
              className={`${value.iconName} ${
                navClass === currentMode ? 'bg-funfuse' : 'bg-gray-300'
              } h-[3rem] w-[3rem] relative
          `}
            />
            {value.updates && (
              <div className='absolute w-4 h-4 bg-red-600 rounded-full top-2/3 left-2/3' />
            )}
          </div>
        );
      })}
    </div>
  );
}
