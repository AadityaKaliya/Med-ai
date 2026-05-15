import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  set
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";


/* FIREBASE CONFIG */

const firebaseConfig = {

  apiKey:
  "AIzaSyBSdyxxlWkXmMe_9vCZQUFmfEZLVk9OQwc",

  authDomain:
  "blood24-f081f.firebaseapp.com",

  databaseURL:
  "https://blood24-f081f-default-rtdb.firebaseio.com",

  projectId:
  "blood24-f081f",

  storageBucket:
  "blood24-f081f.firebasestorage.app",

  messagingSenderId:
  "360763872442",

  appId:
  "1:360763872442:web:13c150d7cc8f69f7b81e83"

};


/* INITIALIZE */

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getDatabase(app);


/* FORM */

const form =
document.getElementById(
  "doctorSignin"
);


/* SIGNUP */

form.addEventListener(
"submit",
async (e) => {

  e.preventDefault();

  try {

    const name =
    document.getElementById(
      "doctorName"
    ).value;

    const email =
    document.getElementById(
      "doctorEmail"
    ).value;

    const password =
    document.getElementById(
      "doctorPassword"
    ).value;

    const phone =
    document.getElementById(
      "doctorPhone"
    ).value;

    const specialization =
    document.getElementById(
      "doctorSpecialization"
    ).value;

    const hospital =
    document.getElementById(
      "doctorHospital"
    ).value;

    const experience =
    document.getElementById(
      "doctorExperience"
    ).value;


    /* CREATE ACCOUNT */

    const userCredential =
    await createUserWithEmailAndPassword(

      auth,
      email,
      password

    );

    const user =
    userCredential.user;


    /* SAVE DOCTOR DATA */

    await set(

      ref(
        db,
        "doctors/" + user.uid
      ),

      {

        doctorName: name,

        doctorEmail: email,

        doctorPhone: phone,

        specialization:
        specialization,

        hospital:
        hospital,

        experience:
        experience,

        role: "doctor",

        createdAt:
        new Date().toISOString()

      }

    );


    alert(
      "Doctor Signup Successful"
    );


    /* REDIRECT */

    window.location.href =
    "doctor-dashboard.html";

  }

  catch(error){

    console.log(error);

    alert(error.message);

  }

});