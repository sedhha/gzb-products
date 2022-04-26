import React from 'react';
import classes from './ResizeSpinner.module.scss';
type Props = {
  spinnerSize?: string;
  fullScreen?: boolean;
};

export default function ResizeSpinner({ spinnerSize, fullScreen }: Props) {
  return (
    <div
      className={`${
        fullScreen ? 'h-screen' : 'h-full'
      } w-full flex justify-center items-center`}>
      <div
        className={classes.loader}
        style={{ fontSize: spinnerSize ?? '1.2rem' }}>
        Loading...
      </div>
    </div>
  );
}
