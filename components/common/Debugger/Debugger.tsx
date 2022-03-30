import React from 'react';
import ValidationInput from '@/components/common/Inputs/InputWithValidation';

export default function Debugger() {
  const debuggerProps = {
    placeholder: 'Testing',
    inputType: 'email',
    onChange: () => null,
    value: 'Name',
  };
  return process.env.NODE_ENV === 'development' ? (
    <ValidationInput {...debuggerProps} />
  ) : null;
}
