
import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  get
}
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";


// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "AIzaSyBSdyxxlWkXmMe_9vCZQUFmfEZLVk9OQwc",

  authDomain: "blood24-f081f.firebaseapp.com",

  databaseURL: "https://blood24-f081f-default-rtdb.firebaseio.com",

  projectId: "blood24-f081f",

  storageBucket: "blood24-f081f.firebasestorage.app",

  messagingSenderId: "360763872442",

  appId: "1:360763872442:web:13c150d7cc8f69f7b81e83"

};


// INITIALIZE FIREBASE

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getDatabase(app);


// CHECK LOGIN

onAuthStateChanged(auth, (user) => {

  if(user){

    get(ref(db, "users/" + user.uid))

    .then((snapshot) => {

      if(snapshot.exists()){

        const data = snapshot.val();

        // PROFILE INFO

        document.getElementById("username").innerText =
          data.name;

        document.getElementById("userage").innerText =
          "Age: " + data.age;

        document.getElementById("userblood").innerText =
          "Blood Group: " + data.bloodgroup;


        // TOP GREETING

        document.querySelector(".topbar h1").innerText =
          "Hello, " + data.name + " 👋";


        // HEALTH CARDS

        const cards =
          document.querySelectorAll(".health-card h2");


        cards[0].innerText =
          data.heartRate + " bpm";

        cards[1].innerText =
          data.bloodPressure;

        cards[2].innerText =
          data.bloodSugar + " mg/dL";

        cards[3].innerText =
          data.weight + " kg";

      }

    })

    .catch((error) => {

      console.log(error);

    });

  }

  else{

    alert("Please Login First");

    window.location.href = "login.html";

  }

});

window.sendSOS = async function () {

    try {

        // ALERT

        alert(
          "Emergency Contact Notified!"
        );

        // OPTIONAL BACKEND CALL

        const response =
        await fetch(
          "http://localhost:3000/call",
          {
            method: "POST",

            headers: {
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({
              number: "+91XXXXXXXXXX"
            })
          }
        );

        const data =
        await response.json();

        console.log(data);

        // PLAY EMERGENCY SOUND

        const audio = new Audio(
          "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
        );

        audio.play();

        // BROWSER NOTIFICATION

        if(
          Notification.permission
          === "granted"
        ){

          new Notification(
            "SOS Emergency Activated",
            {
              body:
              "Emergency contact has been notified."
            }
          );

        }

    }

    catch(error){

        console.log(error);

        alert("SOS Failed");

    }

};