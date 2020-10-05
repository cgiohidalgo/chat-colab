import firebase from "firebase";
import "firebase/firestore";
import "firebase/app";
const config = {
  apiKey: "AIzaSyBwMgnPtNMqDG53uW7U78fiLUbnR2Tug2w",
  authDomain: "un-colab-chat-b7730.firebaseapp.com",
  databaseURL: "https://un-colab-chat-b7730.firebaseio.com",
  projectId: "un-colab-chat-b7730",
  storageBucket: "un-colab-chat-b7730.appspot.com",
  messagingSenderId: "168162731446",
  appId: "1:168162731446:web:7cc573dd840de7b9b38d17"
};

firebase.initializeApp(config);

export const myFirebase = firebase;
export const myFirestore = firebase.firestore();
export const myStorage = firebase.storage();
