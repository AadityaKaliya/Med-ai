import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBSdyxxlWkXmMe_9vCZQUFmfEZLVk9OQwc",
    authDomain: "blood24-f081f.firebaseapp.com",
    databaseURL: "https://blood24-f081f-default-rtdb.firebaseio.com",
    projectId: "blood24-f081f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const requestRef = ref(db, "bloodRequests");

const form = document.getElementById("requestForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const patientName = document.getElementById("patientName").value;
    const bloodGroup = document.getElementById("bloodGroup").value;
    const hospital = document.getElementById("hospital").value;
    const location = document.getElementById("location").value;
    const date = document.getElementById("date").value;
    const unit = document.getElementById("units").value;
    const contact = document.getElementById("contact").value;
    const urgency = document.querySelector('input[name="urgency"]:checked').value;

    if (!patientName || !bloodGroup || !hospital || !location || !date || !contact || !unit) {
        alert("Please fill all fields");
        return;
    }

    push(requestRef, {
        patientName,
        bloodGroup,
        hospital,
        location,
        date,
        unit,
        contact,
        urgency,
        status: "Pending",
        createdAt: new Date().toISOString()
    })
        .then(() => {
            alert("Blood request submitted successfully!");
            form.reset();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
