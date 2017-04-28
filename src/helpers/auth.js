import _ from 'lodash';
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
  return ref.child(`users/${user.uid}/info`).set({ email: user.email, uid: user.uid }).then(() => user);
}

export function auth(email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw).then(saveUser);
}

export function savePost(user, postData) {

  // Get a new unique key to assign everything the same firebase key
  const newPostKey = db().ref().child('posts').push().key;

  // Collect the updates
  const updates = {};

  // Add the firebase key to the body of the post property
  // This is useful later when deleting a post
  const id = { id: newPostKey };
  _.assign(postData, id);

  // Setting firebase property on the post property
  // Setting firebase property on the user/posts property
  updates['/posts/' + newPostKey] = postData;
  updates['/users/' + user.uid + '/posts/' + newPostKey] = postData;

  // Update the table all at once
  return db().ref().update(updates).then(() => postData);
}

export function deletePost(userId, postId) {

  // Collects updates
  const updates = {};

  // Setting property to null removes it from firebase
  updates['/posts/' + postId] = null;
  updates['/users/' + userId + '/posts/' + postId] = null;

  // Update the table all at once
  return db().ref().update(updates).then(() => postId);
}

export function getAllPosts() {

  // Retrieve all the posts at once
  return db().ref('posts').once('value').then((snapshot) => {
      return Object.values(snapshot.val()).map((item) => item);
  }, (errorObject) => {

    // TODO: return an error to the front end so we can display an issue to the user
    console.error(`The read failed: ${errorObject.code}`);
  });
}
