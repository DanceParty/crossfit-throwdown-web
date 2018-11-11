import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import {development} from './keys'

firebase.initializeApp({
  apiKey: development.apiKey || process.env.API_KEY,
  authDomain: development.authDomain || process.env.AUTH_DOMAIN,
  databaseURL: development.databaseURL || process.env.DATABASE_URL,
  projectId: development.projectId || process.env.PROJECT_ID,
  storageBucket: development.storageBucket || process.env.STORAGE_BUCKET,
  messagingSenderId: development.messagingSenderId || process.env.MESSAGING_SENDER_ID,
})
const database = firebase.database()

export {firebase, database}
