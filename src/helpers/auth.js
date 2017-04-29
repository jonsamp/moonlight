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

export function saveUser(user, firstName, lastName) {

  // Get the user's real name from the auth provider, or from their register form.
  const displayName = user.displayName || `${firstName} ${lastName}`;

  // Fill in intial user object
  return ref.child(`users/${user.uid}/info`).set({
    email: user.email || user.providerData[0].email,
    displayName,
    uid: user.uid,
    avatarUrl: user.providerData[0].photoURL || `https://avatar.tobi.sh/${user.uid}`,
    providerId: user.providerData[0].providerId.replace('.com', '')
  }).then(() => user);
}

export function deleteUser(userId, posts) {

  // Collects updates
  const updates = {};

  // Delete all the user's posts
  posts.map((post) => {
    updates[`/posts/${post.id}`] = null;
  });

  // Delete user object
  updates[`/users/${userId}/`] = null;

  // Update the table, then delete from user auth
  return db().ref().update(updates).then(() => {
    firebaseAuth().currentUser.delete().then(logout);
  });
}

export function auth(firstName, lastName, email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw).then((user) => saveUser(user, firstName, lastName));
}

export function signInWithPopup(source) {
  const providers = {
    google: new firebaseAuth.GoogleAuthProvider(),
    twitter: new firebaseAuth.TwitterAuthProvider(),
    facebook: new firebaseAuth.FacebookAuthProvider()
  }
  return firebaseAuth().signInWithPopup(providers[source])
    .then((result) => {
      saveUser(result.user);
    })
}
