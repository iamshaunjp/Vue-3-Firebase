import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCThpQsGd_8rUwGd-t9qCmYN4x3e_uVbVs",
  authDomain: "vue-3-fb9.firebaseapp.com",
  projectId: "vue-3-fb9",
  storageBucket: "vue-3-fb9.appspot.com",
  messagingSenderId: "544877178259",
  appId: "1:544877178259:web:78d7ae682ca4ea36224c66"
}

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

export { db, auth }