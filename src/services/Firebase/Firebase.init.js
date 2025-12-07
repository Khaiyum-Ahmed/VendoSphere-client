// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUf2TAF7B5VfcxgiNNlAzpB38Tg2wM9pw",
    authDomain: "vendosphere-6e51a.firebaseapp.com",
    projectId: "vendosphere-6e51a",
    storageBucket: "vendosphere-6e51a.firebasestorage.app",
    messagingSenderId: "434207271282",
    appId: "1:434207271282:web:9b795d3af752cec8f015eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);