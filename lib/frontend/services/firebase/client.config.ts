// Import the functions you need from the SDKs you need
import { getAuth, browserLocalPersistence } from 'firebase/auth'; // New import
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_CLIENT_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_CLIENT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_CLIENT_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_CLIENT_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_CLIENT_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_CLIENT_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_CLIENT_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
let analytics: Analytics;

const initAnalytics = async () => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
  }
};
initAnalytics();
auth.setPersistence(browserLocalPersistence);
auth.useDeviceLanguage();

export default auth;

export { app, analytics, storage };
