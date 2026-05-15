// ===============================
// FIREBASE IMPORTS
// ===============================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {

  getAuth,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier

}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


// ===============================
// FIREBASE CONFIG
// ===============================

const firebaseConfig = {

  apiKey: "AIzaSyBSdyxxlWkXmMe_9vCZQUFmfEZLVk9OQwc",

  authDomain: "blood24-f081f.firebaseapp.com",

  projectId: "blood24-f081f",

  storageBucket: "blood24-f081f.firebasestorage.app",

  messagingSenderId: "360763872442",

  appId: "1:360763872442:web:13c150d7cc8f69f7b81e83"

};


// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ===============================
// EMAIL LOGIN
// ===============================

window.loginUser = async function(){

  const email =
    document.getElementById("email").value;

  const password =
    document.getElementById("password").value;


  try{

    const userCredential =
      await signInWithEmailAndPassword(

        auth,
        email,
        password

      );

    alert("Login Successful ✅");

    console.log(userCredential.user);

    window.location.href =
      "donate.html";

  }

  catch(error){

    console.log(error);

    alert(error.message);

  }

};


// ===============================
// RECAPTCHA SETUP
// ===============================

window.recaptchaVerifier =
  new RecaptchaVerifier(

    auth,

    "recaptcha-container",

    {

      size: "normal",

      callback: () => {

        console.log("Recaptcha Verified ✅");

      }

    }

  );


// ===============================
// OTP LOGIN FORM
// ===============================

document
  .getElementById("login")
  .addEventListener("submit", sendOTP);


// ===============================
// SEND OTP
// ===============================

function sendOTP(e){

  e.preventDefault();

  let mobileNumber =
    document.getElementById("mobileno").value;

  mobileNumber =
    mobileNumber.trim();


  if(mobileNumber.length !== 10){

    alert("Enter valid number");

    return;

  }


  const phoneNumber =
    "+91" + mobileNumber;


  signInWithPhoneNumber(

    auth,

    phoneNumber,

    window.recaptchaVerifier

  )

  .then((confirmationResult) => {

    window.confirmationResult =
      confirmationResult;

    alert("OTP Sent ✅");

    document
      .getElementById("otpSection")
      .style.display = "block";

  })

  .catch((error) => {

    console.log(error);

    alert(error.message);

  });

}


// ===============================
// VERIFY OTP
// ===============================

window.verifyOTP = function(){

  const otp =
    document.getElementById("otp").value;


  window.confirmationResult

    .confirm(otp)

    .then((result) => {

      alert("OTP Login Successful ✅");

      console.log(result.user);

      window.location.href =
        "donate.html";

    })

    .catch((error) => {

      console.log(error);

      alert("Invalid OTP");

    });

};