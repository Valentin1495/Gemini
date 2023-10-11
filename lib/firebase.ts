// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCDHq3jzFSFxrDfrBBj355PWKRrstqg5d8',
  authDomain: 'quizgpt-399114.firebaseapp.com',
  projectId: 'quizgpt-399114',
  storageBucket: 'quizgpt-399114.appspot.com',
  messagingSenderId: '650985310813',
  appId: '1:650985310813:web:d4effbe8f798b2ae059bb4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
