import dynamic from 'next/dynamic';
const Connects = dynamic(() => import('./Connects/Connects'));
const Events = dynamic(() => import('./Events/Events'));
const Messages = dynamic(() => import('./Messages/Messages'));
const Home = dynamic(() => import('./HomePage/HomePage'));
const Mentorship = dynamic(() => import('./Mentorship/Mentorship'));
const Unknown = dynamic(() => import('./UnknownPage/UnknownPage'));
const VerifiedComponents = {
  Connects,
  Events,
  Messages,
  Home,
  Mentorship,
  Unknown,
};

export default VerifiedComponents;
