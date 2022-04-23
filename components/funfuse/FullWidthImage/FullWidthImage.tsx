import React from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
  containerDivClass?: string;
};

export default function FullWidthImage(props: Props) {
  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      className={props.containerDivClass ? props.containerDivClass : ''}>
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