import React from 'react';

type Props = {
  onModeChange: (mode: string) => void;
  currentMode: string;
  showNotifMode?: string;
  navModeToIconMap: { [key: string]: string };
};

export default function TopNavBar({
  onModeChange,
  currentMode,
  showNotifMode,
  navModeToIconMap,
}: Props) {
  return (
    <div className='flex items-center justify-around w-full px-1 mb-1'>
      {Object.keys(navModeToIconMap).map((navClass) => {
        const value =
          navModeToIconMap[navClass as keyof typeof navModeToIconMap];

        return (
          <div className='relative' key={navClass}>
            <div
              onClick={() => onModeChange(navClass)}
              className={`${value} ${
                navClass === currentMode ? 'bg-funfuse' : 'bg-gray-300'
              } h-[3rem] w-[3rem] relative
          `}
            />
            {showNotifMode === navClass && (
              <div className='absolute w-4 h-4 bg-red-600 rounded-full top-2/3 left-2/3' />
            )}
          </div>
        );
      })}
    </div>
  );
}
