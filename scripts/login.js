// login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const error = document.getElementById("error");

    // Redirect to index.html if already logged in
    if (sessionStorage.getItem("loggedIn") === "true" && !window.location.href.includes("index.html")) {
        window.location.href = "index.html";
        return; // Prevent further execution
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // Example credentials check
            if (username === "admin" && password === "password123") {
                sessionStorage.setItem("loggedIn", "true");
                window.location.href = "index.html";
            } else {
                error.style.display = "block";
                error.textContent = "Invalid username or password";
            }
        });
    }
});
