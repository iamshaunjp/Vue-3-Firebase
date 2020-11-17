import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCFiRmKZ-8r8TvdADjOs3WU9_Bd4351H04",
  authDomain: "muso-ninjas-udemy-sandbox.firebaseapp.com",
  databaseURL: "https://muso-ninjas-udemy-sandbox.firebaseio.com",
  projectId: "muso-ninjas-udemy-sandbox",
  storageBucket: "muso-ninjas-udemy-sandbox.appspot.com",
  messagingSenderId: "107252349673",
  appId: "1:107252349673:web:1a86c314fcff4de47bce78"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }

