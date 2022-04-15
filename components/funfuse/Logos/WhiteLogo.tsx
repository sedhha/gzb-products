import React from 'react';
import Image from 'next/image';

export default function WhiteLogo() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        alt='Mountains'
        src='/funfuse/logo-white.svg'
        layout='fill'
        objectFit='contain'
        priority={true}
      />
    </div>
  );
}
