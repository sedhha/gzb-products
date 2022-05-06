import dyte from '@dyte-server/dyte.config';

export const createMeeting = async () => {
  await dyte.createDyteMeeting();
  return 'data';
};
