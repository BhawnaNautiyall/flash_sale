import { auth } from "./firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const googleBtn =
document.getElementById("googleLoginBtn");

googleBtn.addEventListener("click", async () => {

    try {

        const provider =
        new GoogleAuthProvider();

        const result =
        await signInWithPopup(auth, provider);

        const user =
        result.user;

        const token =
        await user.getIdToken();

        console.log("USER EMAIL:", user.email);
        console.log("TOKEN:", token);

        // SAVE LOGIN DATA
        localStorage.setItem("token", token);
        localStorage.setItem("email", user.email);

        if (
            user.email ===
            "bhawnanotiyal25@gmail.com"
        ) {

            localStorage.setItem("role", "admin");

            alert("Admin Login");

            window.location.href =
            "admin.html";

        }
        else {

            localStorage.setItem("role", "user");

            alert("User Login");

            window.location.href =
            "products.html";

        }

    }
    catch (error) {

        console.log("LOGIN ERROR:", error);

    }

});