import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCGOoqnS4XltEsRwdELPeiU92zkqsxIGVY",
    authDomain: "calendrify-589da.firebaseapp.com",
    projectId: "calendrify-589da",
    storageBucket: "calendrify-589da.appspot.com",
    messagingSenderId: "601030404758",
    appId: "1:601030404758:web:adfdcb4b78c7e647d3b0b7"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const authentication = getAuth();

const firebase = { database, authentication };

export default firebase;