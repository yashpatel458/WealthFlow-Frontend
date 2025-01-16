document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");
    const mainContent = document.querySelector(".main-content");

    // Load the sidebar HTML
    fetch("/WealthFlow-Frontend/components/sidebar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load sidebar: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            sidebarContainer.innerHTML = data;
            sidebarContainer.classList.add("sidebar");

            // Highlight the active link
            const currentPath = window.location.pathname;
            const links = sidebarContainer.querySelectorAll(".nav-link");
            links.forEach(link => {
                if (link.getAttribute("href") === currentPath) {
                    link.classList.add("active");
                }
            });

            // Add sign-out functionality
            const signOutButton = document.getElementById("signOutButton");
            if (signOutButton) {
                signOutButton.addEventListener("click", () => {
                    sessionStorage.removeItem("loggedIn");
                    window.location.href = "/WealthFlow-Frontend/login.html";
                });
            }

            // Handle sidebar toggle for small screens
            const toggleButton = document.createElement("button");
            toggleButton.className = "sidebar-toggle";
            toggleButton.innerHTML = "&#9776;";
            document.body.appendChild(toggleButton);

            toggleButton.addEventListener("click", () => {
                sidebarContainer.classList.toggle("open");

                // Adjust main content margin when sidebar is toggled
                if (sidebarContainer.classList.contains("open")) {
                    mainContent.style.marginLeft = "250px";
                } else {
                    mainContent.style.marginLeft = "0";
                }
            });
        })
        .catch(error => console.error(error));
});
