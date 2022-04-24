import React from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
  containerDivClass?: string;
  dimensionSpec?: boolean;
};

export default function FullWidthImage(props: Props) {
  const minClasses = `${props.dimensionSpec ? '' : 'w-full h-full'}`;
  return (
    <div
      style={{ position: 'relative' }}
      className={
        props.containerDivClass
          ? `${minClasses} ${props.containerDivClass}`
          : minClasses
      }>
      <Image
        alt={props.alt ?? 'Funfuse Logo'}
        src={props.src}
        layout='fill'
        objectFit='contain'
        priority={props.priority ?? false}
      />
    </div>
  );
}
