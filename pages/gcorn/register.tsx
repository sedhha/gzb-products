import React from 'react';
import RegisterPage from '@/components/gcorn/register/RegisterPage';
import metadata from '@firebase-server/public/metadata';
import { IFirebaseMetaData } from '@constants/interfaces/firebase/metadata.interfaces';

interface Props {
  metadata: IFirebaseMetaData;
}
export default function GCorn(props: Props) {
  return <RegisterPage metadata={props.metadata} />;
}

export const getStaticProps = async () => {
  const data = await metadata;
  console.log(data);
  return {
    props: {
      metadata: data,
    },
  };
};
