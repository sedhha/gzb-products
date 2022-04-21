import React from 'react';

type Props = {
  placeholder?: string;
  iconClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  type: 'text' | 'email' | 'password' | 'number';
};

export default function ThemeInputBox({
  placeholder,
  iconClass,
  onChange,
  value,
  type,
}: Props) {
  return (
    <div className='flex flex-row p-4 text-indigo-800 shadow-lg gap-x-2 align-center shadow-indigo-500/50'>
      <div className={`${iconClass} h-[2rem] w-[2rem] bg-indigo-400`} />
      <input
        className='w-full outline-none font-funfuse'
        placeholder={placeholder ?? 'Enter Email Address'}
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}
