// Only use declared variables
'use strict';

// Wrap code in a window load event listener
window.onload = function () {
    const button = document.getElementById('user_logout');

    // Check if the button is found
    if (button) {
        // Attach onclick event handler
        button.onclick = function logout() {
            localStorage.clear();
            sessionStorage.clear();       
            // This will be an empty object after clearing
            console.log(localStorage); 
            // Redirect to the login page
            window.location.href = 'index.html';
        };
    } else {
        console.error('Button not found with id "user_logout"');
    }
};