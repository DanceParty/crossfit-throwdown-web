import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import {development} from './keys'

firebase.initializeApp(development)
const database = firebase.database()

export {firebase, database}
