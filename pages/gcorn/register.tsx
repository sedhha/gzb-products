import React from 'react';
import RegisterPage from '@/components/gcorn/register/RegisterPage';
import metadata from '@firebase-server/public/metadata';
import { IFirebaseMetaData } from '@constants/interfaces/firebase/metadata.interfaces';
import mockMetadata from '@gzb-mocks/metadata.json';
interface Props {
  metadata: IFirebaseMetaData;
}
export default function GCorn(props: Props) {
  return <RegisterPage metadata={props.metadata} />;
}

export const getStaticProps = async () => {
  return {
    props: {
      metadata:
        process.env.ENV_AVAILABLE === 'true' ? await metadata : mockMetadata,
    },
  };
};
