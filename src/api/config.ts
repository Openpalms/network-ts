import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDgt_uum0n9uAdn378SrMeu1C9-6zJ99HA',
  authDomain: 'social-network-c71bd.firebaseapp.com',
  projectId: 'social-network-c71bd',
  storageBucket: 'social-network-c71bd.appspot.com',
  messagingSenderId: '687079913632',
  appId: '1:687079913632:web:2fef38f6922be444fd71c5',
  databaseURL:
    'https://social-network-c71bd-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);
export const bd = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth();
