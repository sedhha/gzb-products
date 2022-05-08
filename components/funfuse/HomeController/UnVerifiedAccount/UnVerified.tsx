import Head from 'next/head';
import React from 'react';
import AppWrapper from '../../hoc/AppWrapper';
import Auth from '@firebase-client/client.config';
import { useRouter } from 'next/router';
type Props = {
  username: string;
  pageRoute: string;
};

export default function UnVerified({ username, pageRoute }: Props) {
  const isUnknownName = username === 'uv';
  const router = useRouter();
  React.useEffect(() => {
    if (Auth.currentUser === null) {
      router.push('/funfuse/login');
    }
  }, [router]);
  return (
    <React.Fragment>
      <Head>
        <title>Funfuse: {username}-Unverified</title>
      </Head>
      <AppWrapper
        topNavBarprops={{
          headerText: 'Unverified Account',
          imageRef: '/funfuse/avatar.png',
          username,
        }}
        bottomNavBarprops={{
          currentRoute: pageRoute,
          username,
        }}
        childComponent={
          <div className='h-full border border-red-400 bg-blue-50'>
            {isUnknownName ? (
              <div className='w-16 h-16 mx-auto mt-8 border-b-2 rounded-full border-funfuse animate-spin' />
            ) : (
              <React.Fragment>
                <div className='flex flex-col items-center justify-between h-full'>
                  <div className='p-3 bg-yellow-100'>
                    <label className='text-black'>
                      Your account needs to be verified before you start using
                      funfuse. Please check your inbox with the subject line:
                      Verify your FunFuse Account and complete verification!
                    </label>
                  </div>
                  <div className='flex flex-col items-center justify-center flex-auto'>
                    <div
                      className={
                        'h-[12rem] w-[12rem] funfuse-icons-warning bg-gray-400'
                      }
                    />
                    <label className='text-center text-gray-400'>
                      Please Verify your Email Address to enjoy the benefits of
                      Funfuse
                    </label>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        }
      />
    </React.Fragment>
  );
}
