// Only use declared variables
'use strict';

// Wrap your code in a window load event listener
window.onload = function () {
    const button_one = document.getElementById('logout_desktop');
    const button_two = document.getElementById('logout_phone');

    // Check if the buttons are found
    if (button_one && button_two) {
        // Attach click event handler for button1
        button_one.addEventListener('click', function () {
            logout();
        });

        // Attach click event handler for button2
        button_two.addEventListener('click', function () {
            logout();
        });

        function logout() {
            localStorage.clear();
            sessionStorage.clear();

            // Redirect to the login page
            window.location.href = 'index.html';
        }
    } else {
        console.error("Buttons not found with specified IDs");
    }
};