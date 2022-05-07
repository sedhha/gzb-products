import IMessage from '@/components/funfuse/IllustrationMessage/IMessage';
import React from 'react';

export default function HomePage() {
  return (
    <IMessage
      src={'/funfuse/events-page.svg'}
      alt={'No Connections'}
      JSXMessageComponent={
        <label className='text-center text-gray-400 font-md font-funfuse'>
          Great things are on the way. We&apos;re still working on this feature.
          Here you all can hop in and promote your businesses, talk about new
          ideas and do epic stuff! Stay tuned and soon its going to be live!
        </label>
      }
    />
  );
}
