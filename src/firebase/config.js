// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore/lite';
// App Check sadece ENFORCE ettiysen gerekli
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,    // <project-id>.appspot.com
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// App Check (Enforce ettiysen ENV verip aç)
const recaptchaV3Key = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY;
if (recaptchaV3Key) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaV3Key),
    isTokenAutoRefreshEnabled: true,
  });
}

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Firestore Lite: REST; WebChannel/Listen yok
export const db = getFirestore(app);

// Storage
export const storage = getStorage(app);

// Debug
console.log('🔥 Firebase initialized successfully!');
console.log('📋 Firebase:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  storageBucket: firebaseConfig.storageBucket,
});

export default app;
