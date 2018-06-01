import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-8V1X-AGZgPYRQb2c6vrjEp9cI-c3BeE",
  authDomain: "catch-of-the-day-46ea9.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-46ea9.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

// default export
export default base;