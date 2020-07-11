import fb from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';
import 'firebase/auth';
import store from '../store';
// import keys from '../keys/index';

console.log('firebase:', process.env);
// console.log('firebase:', keys);
console.log('firebase:', process.env.FIREBASE_API_KEY);

let key;
if (process.env.NODE_ENV === 'production') key = process.env.FIREBASE_API_KEY;
else key = 'AIzaSyAAV3J0g03gcWSyqCNMn-NFTLhVvxvthBk';

if (!fb.apps.length) {
  fb.initializeApp({
    apiKey: key,
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
