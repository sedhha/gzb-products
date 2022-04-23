import React from 'react';

type Props = {
  activeNavBar?: string;
};

const navBarItems = [
  'funfuse-icons-home',
  'funfuse-icons-messages',
  'funfuse-icons-mentorship',
  'funfuse-icons-events',
  'funfuse-icons-connects',
];

export default function BottomNavBar({ activeNavBar }: Props) {
  const [active, setActive] = React.useState(
    activeNavBar ?? 'funfuse-icons-home'
  );
  return (
    <div className='fixed bottom-0 left-0 right-0 flex flex-row items-center justify-between w-full px-2 py-3 border-gray-400 border-solid'>
      {navBarItems.map((element) => {
        return (
          <div
            key={element}
            onClick={() => setActive(element)}
            className={`${element} h-[3rem] w-[3rem] ${
              element === active ? 'bg-indigo-400' : 'bg-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
}
