// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhoRvo-jfAyTSHplUglMO0Oixx2l2VZHQ",
    authDomain: "aioapi-4c80f.firebaseapp.com",
    projectId: "aioapi-4c80f",
    storageBucket: "aioapi-4c80f.appspot.com",
    messagingSenderId: "639782628054",
    appId: "1:639782628054:web:43c0360ffc5c509eed7777",
    measurementId: "G-36PJQXSFWH"
};
firebase.initializeApp(firebaseConfig);

const modal = document.getElementById("authModal");
const closeBtn = document.getElementsByClassName("close")[0];
const form = document.getElementById("authForm");
const switchLink = document.getElementById("switchLink");
const formTitle = document.getElementById("formTitle");
const submitButton = document.getElementById("submitButton");
const confirmPasswordField = document.getElementById("confirmPassword");

let isLoginMode = true;

// Light/Dark Mode Toggle
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-mode');

    // Toggle icons
    const toggleButton = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.classList.remove('light-mode-icon');
        toggleButton.classList.add('dark-mode-icon');
    } else {
        toggleButton.classList.remove('dark-mode-icon');
        toggleButton.classList.add('light-mode-icon');
    }
};

// Open Authentication Modal
document.getElementById("auth-button").onclick = function(e) {
    e.preventDefault();
    modal.style.display = "block";
}

// Close Authentication Modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Click outside modal to close
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Switch between login and signup
switchLink.onclick = function() {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        formTitle.textContent = "Login";
        submitButton.textContent = "Login";
        confirmPasswordField.style.display = "none";
        switchLink.textContent = "Don't have an account? Sign up";
    } else {
        formTitle.textContent = "Sign Up";
        submitButton.textContent = "Sign Up";
        confirmPasswordField.style.display = "block";
        switchLink.textContent = "Already have an account? Login";
    }
}

// Form submit event
form.onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!isLoginMode) {
        const confirmPassword = document.getElementById("confirmPassword").value;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                alert('Signed up successfully!');
                modal.style.display = "none";
            })
            .catch(error => alert(error.message));
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                alert('Logged in successfully!');
                modal.style.display = "none";
            })
            .catch(error => alert(error.message));
    }
}

// Log Out functionality
document.getElementById("logout-button").onclick = function(e) {
    e.preventDefault();
    firebase.auth().signOut()
        .then(() => {
            alert('Logged out successfully!');
            updateUIForLoggedOutUser();
        })
        .catch(error => alert(error.message));
}

// Profile button functionality
document.getElementById("profile-button").onclick = function(e) {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    if (user) {
        alert(`Email: ${user.email}`);
    }
}

// Function to update UI for logged-in user
function updateUIForLoggedInUser() {
    document.getElementById("auth-button").style.display = "none";
    document.getElementById("profile-button").style.display = "inline-block";
    document.getElementById("logout-button").style.display = "inline-block";
}

// Function to update UI for logged-out user
function updateUIForLoggedOutUser() {
    document.getElementById("auth-button").style.display = "inline-block";
    document.getElementById("profile-button").style.display = "none";
    document.getElementById("logout-button").style.display = "none";
}

// Check authentication state on page load
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }
});
