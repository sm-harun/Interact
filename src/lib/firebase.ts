import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCoaylvGbZSTV-PP5NPluvfGLfiLqZWbEU',
  authDomain: 'interact-83c41.firebaseapp.com',
  projectId: 'interact-83c41',
  storageBucket: 'interact-83c41.appspot.com',
  messagingSenderId: '727432884714',
  appId: '1:727432884714:web:5395b6692730eab6c48293',
  measurementId: 'G-BC8HQF9DQR'
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const DataBase = getFirestore(app);
