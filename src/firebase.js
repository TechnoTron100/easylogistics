import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // If you need Firestore

const firebaseConfig = {
  apiKey: "AIzaSyD6oIt1Kah5u4xyHpZ11aZ-veR0oEkWbEw",
  authDomain: "logistics-6c0f7.firebaseapp.com",
  projectId: "logistics-6c0f7",
  storageBucket: "logistics-6c0f7.appspot.com",
  messagingSenderId: "997954253409",
  appId: "1:997954253409:web:0ecbf434fa054fcdbfb020"
};

const app = firebase.initializeApp(firebaseConfig);

export default firebase;
