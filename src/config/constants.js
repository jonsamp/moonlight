import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyB1kWy4wEzBFBx67yed90PalWGOMOopj7w",
  authDomain: "moonlight-dpc.firebaseapp.com",
  databaseURL: "https://moonlight-dpc.firebaseio.com/",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
