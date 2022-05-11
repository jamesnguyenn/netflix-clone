import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAyu6SKjk7_XPXx-tgAbH6RVgxyuWY6My0',
    authDomain: 'netflix-clone-ab852.firebaseapp.com',
    projectId: 'netflix-clone-ab852',
    storageBucket: 'netflix-clone-ab852.appspot.com',
    messagingSenderId: '654830918304',
    appId: '1:654830918304:web:1ff0f4727201f62c4ac7c5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
