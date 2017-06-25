import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB1kWy4wEzBFBx67yed90PalWGOMOopj7w',
  authDomain: 'moonlight-dpc.firebaseapp.com',
  databaseURL: 'https://moonlight-dpc.firebaseio.com/',
  storageBucket: 'gs://moonlight-dpc.appspot.com',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const db = firebase.database;
export const firebaseAuth = firebase.auth;
export const storage = firebase.storage();
export const storageRef = storage.ref();
