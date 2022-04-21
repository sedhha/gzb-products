import React from 'react';
import classes from './SelectableCard.module.scss';
type Props = {
  isSelected: boolean;
  icon: JSX.Element;
  description: string;
};

export default function SelectableCard({
  isSelected,
  icon,
  description,
}: Props) {
  return (
    <React.Fragment>
      <div
        className={`flex flex-col justify-center align-center ${
          isSelected ? 'border-white border-2 rounded' : ''
        }`}>
        {icon}
        <label className='text-center text-white'>{description}</label>
      </div>
    </React.Fragment>
  );
}
