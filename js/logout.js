// Only use declared variables
'use strict';

var button = document.getElementById('logout_button');

// Attach onclick event handler
button.onclick = function logout() {
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to the login page
    window.location.href = 'login.html';
};