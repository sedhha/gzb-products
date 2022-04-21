import React from 'react';

type Props = {
  buttonText: string;
  buttonCallback: () => void;
  twClass?: string;
};
export default function ThemeButton({
  buttonText,
  buttonCallback,
  twClass,
}: Props) {
  return (
    <button
      className={`py-8 px-12 text-white btn bg-funfuse ${twClass ?? ''}`}
      onClick={buttonCallback}>
      {buttonText}
    </button>
  );
}
