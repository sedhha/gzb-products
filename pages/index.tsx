import Head from 'next/head';

import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>GZB Products</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>GZB Products</div>
    </React.Fragment>
  );
}
