import React from 'react';

type Props = {
  iconClass: string;
  isSelected: boolean;
  setSelected: () => void;
  description: string;
};

export default function SelectableCardAlt({
  iconClass,
  isSelected,
  setSelected,
  description,
}: Props) {
  return (
    <div
      className={`flex flex-col p-4 align-center cursor-pointer justify-center mt-2 ${
        isSelected ? 'shadow-lg shadow-indigo-500/50' : ''
      }`}
      onClick={() => setSelected()}>
      <div className={`${iconClass} mx-auto bg-indigo-400`} />
      <label className='text-center text-indigo-800'>{description}</label>
    </div>
  );
}
