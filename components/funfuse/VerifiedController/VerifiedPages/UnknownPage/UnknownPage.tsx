import AppWrapper from '@/components/funfuse/hoc/AppWrapper';
import React from 'react';

export default function HomePage() {
  return (
    <AppWrapper
      childComponent={<div>Seems Like you&apos;re lost</div>}
      topNavBarprops={{ headerText: '404' }}
    />
  );
}
