import AppConstants from '../constants/constants';

export const routeSynthesizer = (location: string) =>
  `${AppConstants.BASE_ROUTE}/${location}`;
