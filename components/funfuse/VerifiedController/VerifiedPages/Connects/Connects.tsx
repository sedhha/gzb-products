import AppWrapper from '@/components/funfuse/hoc/AppWrapper';
import React from 'react';

export default function HomePage() {
  return (
    <AppWrapper
      childComponent={<div>This is Connects Route</div>}
      topNavBarprops={{ headerText: 'Connects' }}
    />
  );
}
