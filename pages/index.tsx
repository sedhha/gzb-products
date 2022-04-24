import Head from 'next/head';
import Link from 'next/link';

import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>GZB Products</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>GZB Products</div>
      <Link href='/funfuse'>FunFuse</Link>
    </React.Fragment>
  );
}
