import fb from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebase/auth';
import store from '../store';
// import keys from '../keys/index';

console.log('firebase:', process.env.NODE_ENV);
// console.log('firebase:', keys);
console.log('firebase:', process.env.FIREBASE_API_KEY);
const key = process.env.FIREBASE_API_KEY;
if (!fb.apps.length) {
  fb.initializeApp({
    apiKey: keys.FIREBASE_API_KEY,
    authDomain: 'honey-s.firebaseapp.com',
    databaseURL: 'https://honey-s.firebaseio.com',
    projectId: 'honey-s',
    storageBucket: 'honey-s.appspot.com',
    messagingSenderId: '498558906948',
    appId: '1:498558906948:web:116a5eb16bed492f',
  });
  fb.auth().onAuthStateChanged(user => {
    if (user) store.dispatch('auth/initUserBeforeLoad', user.uid);
    else store.dispatch('common/toggleLoading', false);
  });
}
