// Only use declared variables
'use strict';

// Wrap your code in a window load event listener
window.onload = function () {
    const button = document.getElementById('logout_button');

    // Check if the button is found
    if (button) {
        // Attach onclick event handler
        button.onclick = function logout() {
            localStorage.clear();
            sessionStorage.clear();

            // Redirect to the login page
            window.location.href = 'login.html';
        };
    } else {
        console.error("Button not found with id 'logout_button'");
    }
};