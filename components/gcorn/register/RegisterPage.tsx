import React from 'react';
import Head from 'next/head';
import Header from '../common/Header/Header';
import { IFirebaseMetaData } from '@constants/interfaces/firebase/metadata.interfaces';

interface Props {
  metadata: IFirebaseMetaData;
}

export const getDefaultGender = (gender: string[] | undefined): string =>
  gender && gender.length > 0 ? gender[0] : 'Male';
export default function GCornHomePage(props: Props) {
  const { gender } = props.metadata;
  const [selectedGender, setSelectedGender] = React.useState(
    getDefaultGender(gender)
  );
  return (
    <React.Fragment>
      <Head>
        <title>gCorn: Register</title>
        <link rel='icon' href='/gcorn/gcorn-logo.svg' />
      </Head>
      <main className='flex flex-col items-center justify-center w-screen h-screen gap-1 p-0 m-0 flex-column'>
        <Header />
        <br />

        <form className='flex flex-col items-center justify-center w-full'>
          <input
            type='email'
            placeholder='Email Address'
            className='p-2 mb-2 text-base bg-transparent border-b-2 outline-none placeholder-slate-600 border-gcorn_pl focus:border-gcorn_p'
          />
          <input
            type='password'
            placeholder='Password'
            className='p-2 mb-2 text-base bg-transparent border-b-2 outline-none placeholder-slate-600 border-gcorn_pl focus:border-gcorn_p'
          />
          <input
            type='password'
            placeholder='Confirm Password'
            className='p-2 mb-2 text-base bg-transparent border-b-2 outline-none placeholder-slate-600 border-gcorn_pl focus:border-gcorn_p'
          />
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className='p-2 mb-2 text-base bg-transparent border-b-2 outline-none w-max placeholder-slate-600 border-gcorn_pl focus:border-gcorn_p'>
            {gender.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
          <br />
          <button
            type='submit'
            className='px-4 py-2 font-semibold bg-transparent border rounded text-gcorn_p border-gcorn_p hover:bg-gcorn_p hover:text-white hover:border-transparent'>
            Next
          </button>
        </form>
      </main>
    </React.Fragment>
  );
}
