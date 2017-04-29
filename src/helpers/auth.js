import { ref, firebaseAuth, db } from '../config/constants';

export function logout() {
  return firebaseAuth().signOut();
}

export function login(email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email);
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}/info`).set({
    email: user.email,
    uid: user.uid,
    avatar_url: `https://avatar.tobi.sh/${user.uid}`
  }).then(() => user);
}

export function auth(email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw).then(saveUser);
}
