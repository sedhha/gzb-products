import React from 'react';

type Props = {
  placeholder?: string;
  iconClass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
};

const isIOS = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  const userAgent =
    navigator?.userAgent || navigator?.vendor || (window as any)?.opera;

  // iOS detection
  return (
    /iPad|iPhone|iPod/.test(userAgent) &&
    !(window as unknown as { MSStream: boolean })?.MSStream
  );
};

export default function ThemeDatePicker({
  placeholder,
  iconClass,
  onChange,
  value,
}: Props) {
  const [isFocussed, setFoussed] = React.useState(false);
  return (
    <div className='flex flex-row p-4 text-indigo-800 shadow-lg gap-x-2 align-center shadow-indigo-500/50'>
      <div className={`${iconClass} h-[2rem] w-[2rem] bg-indigo-400`} />
      <input
        className='w-full outline-none font-funfuse'
        placeholder={placeholder ?? 'Enter Email Address'}
        value={value}
        onChange={onChange}
        type={isFocussed ? 'date' : isIOS() ? 'date' : 'text'}
        onFocus={() => setFoussed(true)}
        onBlur={() => setFoussed(false)}
      />
    </div>
  );
}
