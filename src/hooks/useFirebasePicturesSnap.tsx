import { useState, useEffect } from "react";
import firebase from 'firebase'
// import firebase from 'firebase/app';
// import 'firebase/database';
var firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "morgansite.firebaseapp.com",
    databaseURL: "https://morgansite.firebaseio.com",
    storageBucket: "gs://morgansite.appspot.com"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// defining types...

type DataAsDataUrl = { dataUrl: string; format: string };
type UploadSource = File | DataAsDataUrl | undefined;

// the firebase reference to storage
const storageRef = firebase.storage().ref();

function FirebaseFileSnapShotApi() {
    var listRef = storageRef.child('pictures/uid');

    // Find all the prefixes and items.
    listRef.listAll().then(function(res) {
      res.prefixes.forEach(function(folderRef) {
        console.log(folderRef)
      });
      res.items.forEach(function(itemRef) {
        console.log(itemRef)
      });
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
}

export default FirebaseFileSnapShotApi;