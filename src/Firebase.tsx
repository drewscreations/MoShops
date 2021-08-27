import firebase from 'firebase/app';
import 'firebase/auth'

import * as firebaseui from 'firebaseui';

let config = {
    apiKey: "AIzaSyB4yfSiY27D9ET6cgRhMMI-mek9I9zfC20",
    authDomain: "morgansite.firebaseapp.com",
    databaseURL: "https://morgansite.firebaseio.com",
    projectId: "morgansite",
    storageBucket: "morgansite.appspot.com",
    messagingSenderId: "136503459016",
    appId: "1:136503459016:web:17b2950d308683a365f9fd",
    measurementId: "G-2H1QE6B9DZ",
};
const fbApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    //local > session > none
    .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        //return project.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(`Error code:${errorCode}. Error Message:${errorMessage}`)
    });
let name, email, photoUrl, uid, emailVerified;
// firebase.auth().onAuthStateChanged(function (user) {

//     if (user) {
//         // User is signed in.
//         //console.log("tou're a user")
//         name = user.displayName;
//         email = user.email;
//         photoUrl = user.photoURL;
//         emailVerified = user.emailVerified;
//         uid = user.uid; 
//         // The user's ID, unique to the Firebase project. Do NOT use
//         // this value to authenticate with your backend server, if
//         // you have one. Use User.getToken() instead.
//         token = user.getIdToken
//         //[TODO] make an index signature for user
//         console.log('[Firebase]: auth state changed, hello', user.displayName)
//     } else {
//         // No user is signed in.
//         console.log('[Firebase]:auth state changed, no valid user object')
//     }
// });
let userRef = firebase.auth().currentUser;
let user = {user:userRef}
// if (user != null) {
//     name = user.displayName;
//     email = user.email;
//     photoUrl = user.photoURL;
//     emailVerified = user.emailVerified;
//     uid = user.uid; 
//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
//     token = user.getIdToken
// } else {
//     // No user is signed in.
//     console.log('[Firebase]:user value is null')
// }
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult: any, redirectUrl: any) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            console.log(authResult, redirectUrl)
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.

        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
const myExport =  { fbApp, ui, uiConfig, user, name, email, photoUrl, uid, emailVerified }
export default myExport