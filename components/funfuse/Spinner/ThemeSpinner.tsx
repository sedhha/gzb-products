import React from 'react';
import classes from './ThemeSpinner.module.scss';

type Props = {
  className?: string;
};
export default function ThemeSpinner(props: Props) {
  return (
    <div className={'h-12 p-2 overflow-hidden ' + props.className ?? ''}>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
}
