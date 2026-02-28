// frontend/js/auth.js

// Check if user is logged in
function isAuthenticated() {
    return !!localStorage.getItem('token');
}

// Get user data from local storage
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Update navbar based on auth state
function updateNavbar() {
    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    if (isAuthenticated()) {
        const user = getUser();
        navLinks.innerHTML = `
            <a href="dashboard.html" class="user-greeting">Hi, ${user.name.split(' ')[0]}</a>
            <a href="create-event.html" class="btn btn-primary">Create Event</a>
            <a href="#" id="logoutBtn" class="btn btn-outline">Logout</a>
        `;

        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        navLinks.innerHTML = `
            <a href="login.html">Login</a>
            <a href="register.html" class="btn btn-primary">Sign Up</a>
        `;
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize navbar on page load
document.addEventListener('DOMContentLoaded', updateNavbar);

// Protect routes that require authentication
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
    }
}
