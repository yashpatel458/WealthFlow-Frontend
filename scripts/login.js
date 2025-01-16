document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const error = document.getElementById("error");

    // Handle redirection for index.html
    if (window.location.pathname.includes("index.html")) {
        const isLoggedIn = sessionStorage.getItem("loggedIn");
        if (!isLoggedIn) {
            window.location.href = "/WealthFlow-Frontend/login.html";
        }
        return; // Prevent further execution for login form logic
    }

    // Handle redirection for login.html
    if (window.location.pathname.includes("login.html")) {
        if (sessionStorage.getItem("loggedIn") === "true") {
            window.location.href = "/WealthFlow-Frontend/index.html";
            return;
        }
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
                window.location.href = "/WealthFlow-Frontend/index.html";
            } else {
                error.style.display = "block";
                error.textContent = "Invalid username or password";
            }
        });
    }
});
