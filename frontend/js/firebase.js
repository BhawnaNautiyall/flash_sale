import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAw72smoXtZyZKnVkOOSf-S_in1SdCkIa4",
    authDomain: "flashsale-bd130.firebaseapp.com",
    projectId: "flashsale-bd130",
    storageBucket: "flashsale-bd130.firebasestorage.app",
    messagingSenderId: "1057397234672",
    appId: "1:1057397234672:web:58f4a05e424d871b999b35"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export {
    auth,
    db
};