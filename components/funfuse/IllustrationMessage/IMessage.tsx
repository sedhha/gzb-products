import React from 'react';
import Image from 'next/image';
type Props = {
  imageDim?: number;
  src: string;
  alt?: string;
  message?: string;
  JSXMessageComponent?: JSX.Element;
};

export default function IMessage({
  imageDim,
  src,
  alt,
  message,
  JSXMessageComponent,
}: Props) {
  return (
    <div className='flex flex-col items-center justify-center flex-auto p-4'>
      <Image
        src={src ?? '/funfuse/no-profiles.svg'}
        alt={alt ?? 'End of the road'}
        layout='fixed'
        height={imageDim ?? 200}
        width={imageDim ?? 200}
        priority
      />
      {message !== undefined && (
        <label className='font-semibold text-center text-funfuse font-md font-funfuse'>
          {message}
        </label>
      )}
      {JSXMessageComponent ? JSXMessageComponent : null}
    </div>
  );
}
