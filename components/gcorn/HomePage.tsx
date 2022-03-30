import React from 'react';
import Head from 'next/head';
import classes from './Home.module.scss';
import Image from 'next/image';
import OutlineButton from '../common/Buttons/OutlineButton';
import AppConstants from './global/constants/constants';
import { useRouter } from 'next/router';
import { routeSynthesizer } from './global/utils/routes';
import { routeProps } from './constants/routes';
import { ariaLabels } from './constants/ui-constants';

const { HOME_PAGE_ARIA_LABEL_DESCRIPTOR } = ariaLabels;

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
            priority
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
              aria-label={
                HOME_PAGE_ARIA_LABEL_DESCRIPTOR +
                'OUTLINE_BUTTON' +
                route.routeLocation
              }
              onClick={() => onNavigationButtonClick(route.routeLocation)}>
              {route.buttonText}
            </OutlineButton>
          );
        })}
      </main>
    </React.Fragment>
  );
}
