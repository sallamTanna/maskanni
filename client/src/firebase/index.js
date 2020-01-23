import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBiDGL7gpyi6OetjxSmzimalK0PTMM4vyA",
  authDomain: "maskanni-858d3.firebaseapp.com",
  databaseURL: "https://maskanni-858d3.firebaseio.com",
  projectId: "maskanni-858d3",
  messagingSenderId: "915221898526",
  appId: "1:915221898526:web:4fc51b8a92c5de1cbd150f",
  measurementId: "G-E2FMRTK53D",
  storageBucket: "gs://maskanni-858d3.appspot.com",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
