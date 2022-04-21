import React from 'react';
import classes from './ThemeSpinner.module.scss';

export default function ThemeSpinner() {
  return (
    <div className='h-12 p-2 overflow-hidden'>
      <div className={classes.loader}>Loading...</div>
    </div>
  );
}
