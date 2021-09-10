import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCgPUS_NT5aT71eTQU0DZRUc2C7ROWCsEw",
  authDomain: "linkedin-clone-yt-31889.firebaseapp.com",
  projectId: "linkedin-clone-yt-31889",
  storageBucket: "linkedin-clone-yt-31889.appspot.com",
  messagingSenderId: "641963672938",
  appId: "1:641963672938:web:b2d1de3253900e9876d113",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
