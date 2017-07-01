import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB1kWy4wEzBFBx67yed90PalWGOMOopj7w',
  authDomain: 'moonlight-dpc.firebaseapp.com',
  databaseURL: 'https://moonlight-dpc.firebaseio.com/',
  storageBucket: 'gs://moonlight-dpc.appspot.com',
};

const devConfig = {
  apiKey: ' AIzaSyB293UVoldkZWzzh4kz3yO7LR0hv_yplSs',
  authDomain: 'moonlight-f5246.firebaseapp.com',
  databaseURL: 'https://moonlight-f5246.firebaseio.com/',
  storageBucket: 'gs://moonlight-f5246.appspot.com',
};

let enviro;

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_ENV === 'production') {
  enviro = config;
} else {
  enviro = devConfig;
}

firebase.initializeApp(enviro);

export const ref = firebase.database().ref();
export const db = firebase.database;
export const firebaseAuth = firebase.auth;
export const storage = firebase.storage();
export const storageRef = storage.ref();
