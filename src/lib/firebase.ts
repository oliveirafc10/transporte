import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDlyYqOsrq4AyV2lgCyFt2jKb2qPHziTc0',
  authDomain: 'mobisoft-login.firebaseapp.com',
  projectId: 'mobisoft-login',
  storageBucket: 'mobisoft-login.appspot.com',
  messagingSenderId: '696083858103',
  appId: '1:696083858103:web:21878aad27b50a1e5d4332',
  measurementId: 'G-J6TCK25NKW',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth
