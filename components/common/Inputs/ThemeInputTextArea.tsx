import React from 'react';

type Props = {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string | number;
  row?: number;
  col?: number;
  className?: string;
};

export default function ThemeInputTextArea({
  placeholder,
  onChange,
  value,
  row,
  col,
  className,
}: Props) {
  return (
    <div
      className={`text-indigo-800 shadow-lg shadow-indigo-500/50 ${
        className ?? ''
      }`}>
      <textarea
        className='w-full outline-none font-funfuse'
        placeholder={placeholder ?? 'Enter Email Address'}
        value={value}
        onChange={onChange}
        rows={row ?? 1}
        cols={col ?? 1}
      />
    </div>
  );
}
