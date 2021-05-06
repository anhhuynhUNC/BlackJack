import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import LoginPage from './LoginPage'

// const firebaseConfig = {
//   apiKey: "AIzaSyAjg5WmwXYUauUyVE5YkV-kEYNd1_lOK3c",
//   authDomain: "comp426-74893.firebaseapp.com",
//   projectId: "comp426-74893",
//   storageBucket: "comp426-74893.appspot.com",
//   messagingSenderId: "366419188538",
//   appId: "1:366419188538:web:fc9ef5139d2239cbf40e03",
//   measurementId: "G-77TL2TJLC3"
// };

// firebase.initializeApp(firebaseConfig)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
