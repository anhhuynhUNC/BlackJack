import firebase from 'firebase';
import * as  firebaseui from 'firebaseui'


const firebaseConfig = {
    apiKey: "AIzaSyAjg5WmwXYUauUyVE5YkV-kEYNd1_lOK3c",
    authDomain: "comp426-74893.firebaseapp.com",
    databaseURL: "https://comp426-74893-default-rtdb.firebaseio.com",
    projectId: "comp426-74893",
    storageBucket: "comp426-74893.appspot.com",
    messagingSenderId: "366419188538",
    appId: "1:366419188538:web:fc9ef5139d2239cbf40e03",
    measurementId: "G-77TL2TJLC3"
};

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        //uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            //document.getElementById('loader').style.display = 'none';
       // }
    },
    //signInSuccessUrl:'/',
    signInOptions: [
        
         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
           firebase.auth.EmailAuthProvider.PROVIDER_ID
        
     
        
    ],
    // Other config options...
};

firebase.initializeApp(firebaseConfig);

let ui = new firebaseui.auth.AuthUI(firebase.auth());

const startFirebaseUI = function () {
    return uiConfig
}

export default startFirebaseUI;

