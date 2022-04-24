import React, { useState } from 'react';

type Props = {
  activeColor?: string;
};

export default function ToggleButton(props: Props) {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((prev) => !prev);
  const toggleColor = toggle
    ? `bg-${props.activeColor ?? '[#4DD163]'}`
    : 'bg-gray-300';
  const buttonPlacement = `${
    toggle
      ? 'top-1/2 left-0 transform -translate-y-1/2'
      : 'top-1/2 right-0 transform -translate-y-1/2'
  }`;
  return (
    <div className='flex flex-row w-full'>
      <button
        onClick={handleToggle}
        className={`absolute mt-1 w-[4rem] h-[1.5rem] rounded-lg ${toggleColor} relative p-2`}>
        <div
          className={`h-[2rem] w-[2rem] rounded-full bg-white absolute ${buttonPlacement} border border-${toggleColor} transition-transform duration-75 cursor-pointer`}
        />
      </button>
    </div>
  );
}
