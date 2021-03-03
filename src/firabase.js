import firebase from 'firebase/app';
import "firebase/auth";


const app = firebase.initializeApp({
    // process.env.NAme
    apiKey: "AIzaSyDSKqV1WFxO_gXhyvzMdI00fg3ZwPxziaA",
    authDomain: "auth-test-b1e36.firebaseapp.com",
    projectId: "auth-test-b1e36",
    storageBucket: "auth-test-b1e36.appspot.com",
    messagingSenderId: "802158696150",
    appId: "1:802158696150:web:b1b9d387a4b738cd901b77",
    measurementId: "G-Y1R06C5V9C"
});



export const auth = app.auth();
export default app;


