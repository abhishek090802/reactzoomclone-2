// This code snippet is setting up the Firebase configuration and initializing the Firebase app. It also imports and exports necessary functions and references to interact with Firebase services. Let's break down the code:

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
// Importing Firebase SDK functions:

// getAuth: Importing the getAuth function from the Firebase Auth SDK. This function is used to get the Firebase Authentication service object.

// initializeApp: Importing the initializeApp function from the Firebase App SDK. This function is used to initialize the Firebase app with the provided configuration.

// collection, getFirestore: Importing functions from the Firebase Firestore SDK. collection is used to reference a specific collection in Firestore, and getFirestore is used to get the Firestore instance.


const firebaseConfig = {
  apiKey: "AIzaSyB3Ep2NIwolDYGajSULfIYqB_A4sbmQfME",
  authDomain: "zoom-clone-a777e.firebaseapp.com",
  projectId: "zoom-clone-a777e",
  storageBucket: "zoom-clone-a777e.appspot.com",
  messagingSenderId: "422337301967",
  appId: "1:422337301967:web:2582af25aa3aa25d7016ba",
  measurementId: "G-HBKT2WW8EM"
};

// firebaseConfig:

// The object containing the Firebase configuration with the following properties:

// apiKey: The API key for the Firebase project.

// authDomain: The authentication domain for the Firebase project.

// projectId: The project ID of the Firebase project.

// storageBucket: The storage bucket for the Firebase project.

// messagingSenderId: The messaging sender ID for the Firebase project.

// appId: The app ID for the Firebase project.

// measurementId: The measurement ID for the Firebase project.

const app = initializeApp(firebaseConfig);
// Initializing the Firebase app:

// const app = initializeApp(firebaseConfig);: Initializes the Firebase app using the provided firebaseConfig.

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

// Exporting Firebase Auth and Firestore references:

// firebaseAuth: Exports the Firebase Authentication service object initialized with the app instance.

// firebaseDB: Exports the Firestore instance initialized with the app instance.


export const usersRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");

// Creating references to Firestore collections:

// usersRef: Exports a reference to the "users" collection in Firestore.

// meetingsRef: Exports a reference to the "meetings" collection in Firestore.

// more specifically link to the firebase database
// https://console.firebase.google.com/project/zoom-clone-a777e/firestore/data/~2Fmeetings~2Fmu7WBET8XtvTwpKvXpWm


// These references allow the application to interact with the Firebase Auth service for authentication-related tasks and the Firestore service to perform database operations like reading and writing data to the "users" and "meetings" collections.

// Additionally, you provided a link to the Firebase console with a specific path to the Firestore data for the "meetings" collection. This link allows direct access to the data stored in the "meetings" collection within the Firebase project.
