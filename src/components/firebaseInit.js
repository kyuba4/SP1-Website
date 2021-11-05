import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBv4vExNvHIPw3nYo0NSLpzV8a7vitrzzI",
  authDomain: "test-65939.firebaseapp.com",
  projectId: "test-65939",
  storageBucket: "test-65939.appspot.com",
  messagingSenderId: "841343114516",
  appId: "1:841343114516:web:d2d404cc4012472b257601",
  measurementId: "G-0D70VHW64D",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();

export { database, getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject };
