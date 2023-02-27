import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import LanguageDetails from './views/LanguageDetails'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDxf1CTXs8Emb08__tZCAiQu9GM6CQqZDU',
  authDomain: 'translate-df955.firebaseapp.com',
  projectId: 'translate-df955',
  storageBucket: 'translate-df955.appspot.com',
  messagingSenderId: '1044555473445',
  appId: '1:1044555473445:web:68ab8fedb2f66de75f95cc',
  measurementId: 'G-FYZ9QKRXCC',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const App = () => {
  // console.log(app)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/screen/:id" element={<LanguageDetails />} />
    </Routes>
  )
}

export default App
