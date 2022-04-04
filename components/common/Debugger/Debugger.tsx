import React from 'react';

export default function Debugger() {
  return process.env.NODE_ENV === 'development' ? (
    <div>Debug Active</div>
  ) : null;
}
