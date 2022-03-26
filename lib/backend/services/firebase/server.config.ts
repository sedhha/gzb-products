import admin from 'firebase-admin';

const keyString = process.env.FB_ADMIN_PRIVATE_KEY ?? '{"privateKey": ""}';

const { privateKey } = JSON.parse(keyString);

if (privateKey === '') {
  console.log('FIREBASE_PRIVATE_KEY is not set');
  throw new Error('FIREBASE_PRIVATE_KEY is not set');
}

if (admin.apps.length === 0)
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey: privateKey,
      projectId: process.env.NEXT_PUBLIC_FB_CLIENT_PROJECT_ID,
    }),
  });

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();

const Server = { auth, db, storage };
export default Server;
//To Add other Details:
//https://stackoverflow.com/questions/38389341/firebase-create-user-with-email-password-display-name-and-photo-url
//User specific Rules: https://stackoverflow.com/questions/57680416/firestore-rules-how-to-make-user-can-only-read-write-to-document-with-their-name
// Email Address = database-type
