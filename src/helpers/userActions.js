import _ from 'lodash';
import { db, storageRef } from '../config/constants';

export function getAllPosts() {

  // Retrieve all the posts at once
  return db().ref('posts').once('value').then((snapshot) => {
      return Object.values(snapshot.val()).map((item) => item);
  }, (errorObject) => {

    // TODO: return an error to the front end so we can display an issue to the user
    console.error(`The read failed: ${errorObject.code}`);
  });
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
  updates[`/posts/${newPostKey}`] = postData;
  updates[`/users/${user.uid}/posts/${newPostKey}`] = postData;

  // Update the table all at once
  return db().ref().update(updates).then(() => postData);
}

export function deletePost(userId, postId) {

  // Collects updates
  const updates = {};

  // Setting property to null removes it from firebase
  updates[`/posts/${postId}`] = null;
  updates[`/users/${userId}/posts/${postId}`] = null;

  // Update the table all at once
  return db().ref().update(updates);
}

export function fulfillRequest(userId, postId, fullFill = true) {

  // Collects updates
  const updates = {};

  // Setting property to null removes it from firebase
  updates[`/posts/${postId}/fulfilled`] = fullFill;
  updates[`/users/${userId}/posts/${postId}/fulfilled`] = fullFill;

  // Update the table all at once
  return db().ref().update(updates);
}


export function getUser(userId) {
  return db().ref(`users/${userId}/info`).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

export function getAllUserData(userId) {
  return db().ref(`users/${userId}`).once('value').then((snapshot) => {
    return snapshot.val();
  });
}

function setAvatar(userId, avatarUrl) {
  const updates = {};
  updates[`users/${userId}/info/avatarUrl`] = avatarUrl;
  return db().ref().update(updates);
}

export function uploadAvatar(userId, file) {
  const avatarRef = storageRef.child(userId);
  return avatarRef.put(file).then((snapshot) => {
    setAvatar(userId, snapshot.a.downloadURLs[0]);
    return snapshot.a.downloadURLs[0];
  });
}

export function saveUserData(userId, userInfo) {

  // Get the current data in the db for this user
  return getUser(userId).then((data) => {

    // Recursively merge the new data with the existing data
    const newUserInfo = _.merge({}, data, userInfo)

    // Write the new data
    return  db().ref().child(`users/${userId}/info`).set(newUserInfo)
  });
}
