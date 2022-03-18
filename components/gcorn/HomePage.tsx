import React from 'react';
import Head from 'next/head';
import classes from './Home.module.scss';
import Image from 'next/image';
import OutlineButton from '../common/Buttons/OutlineButton';
import AppConstants from './global/constants/constants';
import { useRouter } from 'next/router';
import { routeSynthesizer } from './global/utils/routes';

const routeProps = [
  {
    id: 0,
    buttonText: 'Sign In',
    routeLocation: 'login',
  },
  {
    id: 0,
    buttonText: 'Create An Account',
    routeLocation: 'register',
  },
];

export default function GCornHomePage() {
  const router = useRouter();
  const onNavigationButtonClick = (path: string) => {
    const routeLocation = routeSynthesizer(path);
    router.push(routeLocation);
  };
  return (
    <React.Fragment>
      <Head>
        <title>gCorn: A Corner for Geeks</title>
        <link rel='icon' href='/gcorn/gcorn-logo.svg' />
      </Head>
      <main className={classes.mainSection}>
        <div className={'image-container'}>
          <Image
            src={'/gcorn/gcorn-logo.svg'}
            alt={'gcorn-logo'}
            layout='fill'
            objectFit='contain'
          />
        </div>
        <div className={classes.WrapperDiv}>
          <h1 className={classes.Header}>gCorn!</h1>
          <p className={classes.Tagline}>A Corner for Geeks</p>
        </div>
        <br />
        {routeProps.map((route) => {
          return (
            <OutlineButton
              key={route.id}
              outlineColor={AppConstants.THEME_GREEN}
              onClick={() => onNavigationButtonClick(route.routeLocation)}>
              {route.buttonText}
            </OutlineButton>
          );
        })}
      </main>
    </React.Fragment>
  );
}
