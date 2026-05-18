import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

// Initialize Firebase Admin only if credentials exist
if (
  firebaseConfig.projectId &&
  firebaseConfig.privateKey &&
  firebaseConfig.clientEmail
) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: firebaseConfig.projectId,
        privateKey: firebaseConfig.privateKey,
        clientEmail: firebaseConfig.clientEmail,
      }),
      databaseURL: firebaseConfig.databaseURL,
    });
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
} else {
  console.warn('⚠️  Firebase credentials not found. Running in demo mode.');
}

// Export database reference with optional chaining
export const db = admin.apps && admin.apps.length > 0 ? admin.firestore?.() : null;
export const auth = admin.apps && admin.apps.length > 0 ? admin.auth?.() : null;
export default admin;
