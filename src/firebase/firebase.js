import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBX9XCXlAQb91wUf9VjiWN9I3C8BhS0xRk",
  authDomain: "eupraxicti.firebaseapp.com",
  databaseURL: "https://eupraxicti-default-rtdb.firebaseio.com/",
  projectId: "eupraxicti",
  storageBucket: "eupraxicti.appspot.com",
  messagingSenderId: "644787555206",
  appId: "1:644787555206:web:8428b0c17a8adb980eba07",
  measurementId: "G-S6ZBRBZLN1"
};

firebase.initializeApp(config);
const auth = firebase.auth();
// const auth = "";

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();

export {
  database,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
