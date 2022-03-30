import Debugger from '@/components/common/Debugger/Debugger';
import React from 'react';

type Props = {};

export default function Debug({}: Props) {
  return (
    <React.Fragment>
      <div>Debug</div>
      <Debugger />
    </React.Fragment>
  );
}
