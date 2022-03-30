import { FormErrorTypes } from '@global-backend/validators/forms';
import React, { HTMLInputTypeAttribute, ReactElement } from 'react';

interface IValidation {
  validationTypes: FormErrorTypes;
  validationMessage: string;
}
type IValidationProps = {
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: HTMLInputTypeAttribute;
  validation?: IValidation;
};

export default function InputWithValidation(
  props: IValidationProps
): ReactElement {
  const [error, setError] = React.useState(true);
  //Use Effect for initial Validation
  const { placeholder, value, onChange, inputType, validation } = props;
  const validationCheck = error && validation !== undefined;
  const borderColor = validationCheck ? 'red-300' : 'gcorn_pl';
  const focusColor = validationCheck ? 'red-600' : 'gcorn_p';
  return (
    <div className='flex flex-col p-1 mb-2'>
      <input
        type={inputType ? inputType : 'text'}
        placeholder={placeholder}
        className={`p-2 text-base bg-transparent border-b-2 outline-none placeholder-slate-600 border-${borderColor} focus:border-${focusColor}`}
      />
      {validationCheck ? (
        <label className='p-1 text-sm text-red-500'>
          Error: Invalid Email address
        </label>
      ) : null}
    </div>
  );
}
