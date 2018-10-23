import firebase from 'firebase/app'
import 'firebase/database'
import { development, test } from './keys'

let firebaseConfig

if (process.env.NODE_ENV === 'development') {
  firebaseConfig = { ...development }
} else if (process.env.NODE_ENV === 'test') {
  firebaseConfig = { ...test }
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

export { firebaseConfig, database }
