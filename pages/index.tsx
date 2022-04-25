import Head from 'next/head';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/funfuse');
  }, [router]);
  return (
    <React.Fragment>
      <Head>
        <title>GZB Products</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </React.Fragment>
  );
}
